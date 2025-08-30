using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CreateOrderItemModel
    {
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
    }
}
