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
        //public string Email { get; set; }
        public string Address { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public bool IsGuest { get; set; } = false;
    }
}
