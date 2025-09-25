using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CartItemModel
    {
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string PhotoUrl { get; set; }
    }
}
