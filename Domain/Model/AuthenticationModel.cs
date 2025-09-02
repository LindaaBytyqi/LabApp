﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class AuthenticationModel
    {
        public string Token { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }
        public UserModel UserData { get; set; } = default!;
        public string UserRole { get; set; } = default!;
    }
}
