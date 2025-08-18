using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class BookModel
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQty { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Publisher { get; set; }
        public string? PhotoUrl { get; set; }
        public IFormFile? Photo { get; set; }

        // 🔗 Lidhja me Category
        public Guid CategoryId { get; set; }  // Foreign Key
        public Category Category { get; set; }
        public string CategoryName { get; set; }
        public List<AuthorModel> Authors { get; set; }
    }
}
