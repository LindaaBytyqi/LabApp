using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public Guid Id { get; set; }
        public string LastName { get; set; }
        public string PersonalID { get; set; }
        public string PersonalEmail { get; set; }
    }
}
