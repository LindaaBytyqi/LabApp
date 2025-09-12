using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IAuthorService
    {
        public Task<List<AuthorModel>> GetAll(CancellationToken cancellationToken);
        public Task<AuthorModel> CreateOrUpdate(AuthorModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<AuthorModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken);

        Task<int> GetAuthorsCount(CancellationToken cancellationToken);
    }
}
