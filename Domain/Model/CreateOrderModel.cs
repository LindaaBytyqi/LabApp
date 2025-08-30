using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CreateOrderModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }     // shtuar
        public string ZipCode { get; set; }  // shtuar

        public List<CreateOrderItemModel> Items { get; set; }
    }
}
