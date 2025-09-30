using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        //public Guid Id { get; set; } = Guid.NewGuid();
        //public string FullName { get; set; }   // më mirë emër i plotë
        //public string Email { get; set; }
        //public string Phone { get; set; }
        //public string Address { get; set; }
        //public string City { get; set; }
        //public string ZipCode { get; set; }
        //public decimal TotalPrice { get; set; }
        //public DateTime CreatedAt { get; set; } = DateTime.Now;

        //public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();



        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public PaymentMethod PaymentMethod { get; set; }

        // Opsionalisht për pagesë online
        public string? CardNumber { get; set; }
        public string? CardHolder { get; set; }
        public string? ExpirationDate { get; set; }
        public string? CVV { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    }
}
