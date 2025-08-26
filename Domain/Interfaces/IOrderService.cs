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
        Task<int> PlaceOrder(int userId, PlaceOrderModel model);
        Task<List<OrderModel>> GetUserOrders(int userId);
    }
}
