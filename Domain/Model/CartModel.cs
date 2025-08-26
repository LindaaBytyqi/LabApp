using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CartModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public List<CartItemModel> Items { get; set; } = new List<CartItemModel>();
    }
}
