using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQty { get; set; }
        public DateTime PublishedDate { get; set; }
        public string? PhotoUrl { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public Publisher Publisher { get; set; }
        public Guid PublisherId { get; set; }
       // public ICollection<BookAuthor> BookAuthors { get; set; }
        public ICollection<BookAuthor> BookAuthors { get; set; } = new List<BookAuthor>();

       // public ICollection<BookAuthor> BookAuthors { get; set; } = new List<BookAuthor>();
    }

}

