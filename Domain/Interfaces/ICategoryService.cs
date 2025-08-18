using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ICategoryService

    {
        public Task<List<CategoryModel>> GetAll(CancellationToken cancellationToken);
        public Task<CategoryModel> CreateOrUpdate(CategoryModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<CategoryModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetCategorySelectListAsync(CancellationToken cancellationToken);


    }
}
