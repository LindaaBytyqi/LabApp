using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cart
    {
        public Guid Id { get; set; }  // Primary Key
        public Guid UserId { get; set; } // Lidhja me User

        // Navigational property → një Cart ka shumë CartItems
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
