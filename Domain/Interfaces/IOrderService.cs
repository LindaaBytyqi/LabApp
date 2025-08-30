using Domain.Entities;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IOrderService
    {
       
            Task<OrderModel> CreateOrderAsync(CreateOrderModel model);
            Task<List<OrderModel>> GetAllOrdersAsync();
            Task<OrderModel> GetOrderByIdAsync(Guid id);

      

    }
}
