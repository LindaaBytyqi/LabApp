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
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public CategoryService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<CategoryModel> CreateOrUpdate(CategoryModel model, CancellationToken cancellationToken)
        {
            Category category;

            if (model.Id == null)
            {
                category = new Category();
                await appDbContext.Categories.AddAsync(category);
            }
            else
            {
                category = await appDbContext.Categories.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);

                if (category == null)
                {
                    // Opsionale: nëse nuk e gjen, krijo të ri
                    category = new Category();
                    await appDbContext.Categories.AddAsync(category);
                }
            }

            category.Name = model.Name;

            await appDbContext.SaveChangesAsync(cancellationToken);

            return await GetById(category.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var category = await appDbContext.Categories
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            appDbContext.Categories.Remove(category);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<CategoryModel>> GetAll(CancellationToken cancellationToken)
        {
            var categories = await appDbContext.Categories.ToListAsync(cancellationToken);

            var model = mapper.Map<List<CategoryModel>>(categories);

            return model;
        }

        public async Task<CategoryModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var category = await appDbContext.Categories
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<CategoryModel>(category);

            return model;
        }

        public async Task<List<ListItemModel>> GetCategorySelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Categories
                .Select(c => new ListItemModel()
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToListAsync(cancellationToken);

            return model;
        }
    }
}
