using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CartItem
    {
        public Guid Id { get; set; }
        public string PhotoUrl { get; set; }
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
        public Book Book { get; set; }
        public Guid UserId { get; set; }   // 👈 duhet Guid
        public User User { get; set; }
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }

       
        }

}

