using AutoMapper;
//using AutoMapper.Execution;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace Application.Services
{
    public class PublisherService:IPublisherService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public PublisherService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<PublisherModel> CreateOrUpdate(PublisherModel model, CancellationToken cancellationToken)
        {
            Publisher publisher;

            if (model.Id == null)
            {
                publisher = new Publisher();
                await appDbContext.Publishers.AddAsync(publisher);
            }
            else
            {
                publisher = await appDbContext.Publishers.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);

                if (publisher == null)
                {
                    // Opsionale: nëse nuk e gjen, krijo të ri
                    publisher = new Publisher();
                    await appDbContext.Publishers.AddAsync(publisher);
                }
            }

            publisher.Name = model.Name;

            await appDbContext.SaveChangesAsync(cancellationToken);

            return await GetById(publisher.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var publisher = await appDbContext.Publishers
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            appDbContext.Publishers.Remove(publisher);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<PublisherModel>> GetAll(CancellationToken cancellationToken)
        {
            var publishers = await appDbContext.Publishers.ToListAsync(cancellationToken);

            var model = mapper.Map<List<PublisherModel>>(publishers);

            return model;
        }

        public async Task<PublisherModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var publisher = await appDbContext.Publishers
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<PublisherModel>(publisher);

            return model;
        }

        public async Task<List<ListItemModel>> GetPublisherSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Publishers
                .Select(c => new ListItemModel()
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToListAsync(cancellationToken);

            return model;
        }
    }
}
