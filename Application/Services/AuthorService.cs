using AutoMapper;
//using AutoMapper.Execution;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Application.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public AuthorService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<AuthorModel> CreateOrUpdate(AuthorModel model, CancellationToken cancellationToken)
        {
            Author author;

            if (model.Id == null)
            {
                author = new Author();
                await appDbContext.Authors.AddAsync(author);
            }
            else
            {
                author = await appDbContext.Authors.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
                if (author == null)
                {
                    // Opsionale: nëse nuk e gjen, krijo të ri
                    author = new Author();
                    await appDbContext.Authors.AddAsync(author);
                }
            }

            author.Name = model.Name;
            author.Bio = model.Bio;
            author.DateOfBirth=model.DateOfBirth;
            author.Country = model.Country;
            //uthor.BookId = model.BookId;



            await appDbContext.SaveChangesAsync(cancellationToken);

            return await GetById(author.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var author = await appDbContext.Authors.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.Authors.Remove(author);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<AuthorModel>> GetAll(CancellationToken cancellationToken)
        {
            var authors = await appDbContext.Authors.ToListAsync(cancellationToken);

            var model = mapper.Map<List<AuthorModel>>(authors);

            return model;
        }

        public async Task<AuthorModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var author = await appDbContext.Authors.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<AuthorModel>(author);

            return model;
        }

        //    public async Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken)
        //    {
        //        var model = await appDbContext.Authors
        //.Include(c => c.Books)
        //.Select(c => new ListItemModel()
        //{
        //    Id = c.Id,
        //    Name = (c.Books.Any() ? c.Books.First().FullName : "") + ", " + c.Name
        //}).ToListAsync(cancellationToken);
        //    }

        public async Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Authors
                .Select(a => new ListItemModel()
                {
                    Id = a.Id,
                    Name = a.Name
                }).ToListAsync(cancellationToken);

            return model;
        }
    }
}



