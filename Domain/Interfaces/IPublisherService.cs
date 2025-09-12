using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IPublisherService
    {
        public Task<List<PublisherModel>> GetAll(CancellationToken cancellationToken);
        public Task<PublisherModel> CreateOrUpdate(PublisherModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<PublisherModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetPublisherSelectListAsync(CancellationToken cancellationToken);

        Task<int> GetPublishersCount(CancellationToken cancellationToken);
    }
}
