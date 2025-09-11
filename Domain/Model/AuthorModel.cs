using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class AuthorModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }

        public DateTime? DateOfBirth { get; set; } // Data e lindjes (opsionale)

        public string Country { get; set; } // Vendi i origjinës (opsionale)

       // public string? PhotoUrl { get; set; }
    }
}
