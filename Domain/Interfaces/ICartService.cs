using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ICartService
    {
        
            Task<CartModel> GetCart(Guid userId);  // <-- ndryshuar nga List<CartModel> në CartModel
            Task AddToCart(Guid userId, CartItemModel model);
            Task RemoveFromCart(Guid userId, Guid bookId); // ndryshuar nga int në Guid
            Task ClearCart(Guid userId);
        
    }
}
