using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IBookService
    {
        public Task<List<BookModel>> GetAll(CancellationToken cancellationToken);
        public Task<BookModel> CreateOrUpdate(BookModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<BookModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetBookSelectListAsync(CancellationToken cancellationToken);

        public Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetCategorySelectListAsync(CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetPublisherSelectListAsync(CancellationToken cancellationToken);
        public Task<int> GetBooksCount(CancellationToken cancellationToken);

        public Task<List<BookModel>> SearchBooks(string? titleTerm);
    }
}
