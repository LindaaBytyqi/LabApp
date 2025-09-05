using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class UserModel
    {
        public Guid? Id { get; set; }
        public string UserName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string PersonalEmail { get; set; } = default!;
        public string? Password { get; set; } = default!;
        public string Address { get; set; } = default!;
        public Role? Role { get; set; } = default!;
    }
}
