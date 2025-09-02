﻿using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class AuthorizationManager : IAuthorizationManager
    {
        private readonly ClaimsPrincipal calaimsPrinclipal;
        private readonly IHttpContextAccessor _contextAccessor;
        public string ClaimTypeName => "Id";

        public AuthorizationManager(ClaimsPrincipal calaimsPrinclipal, IHttpContextAccessor httpContextAccessor)
        {
            this.calaimsPrinclipal = calaimsPrinclipal;
            _contextAccessor = httpContextAccessor;

        }
        public Guid? GetUserid()
        {
            var token = GetCurrentToken();
            if (string.IsNullOrEmpty(token) || token == "null")
            {
                return null!;
            }
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = jsonToken as JwtSecurityToken;

            var userId = tokenS.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault();

            return userId != null ? Guid.Parse(userId) : null;
        }

        public bool? IsAuthenticated()
        {
            return calaimsPrinclipal != null && calaimsPrinclipal?.Identity?.IsAuthenticated == true;

        }
        public List<Claim> GetClaims()
        {
            return this.calaimsPrinclipal.Claims.ToList();
        }

        private string GetCurrentToken()
        {
            var token = _contextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                var query = _contextAccessor.HttpContext?.Request.Query["access_token"];
                if (query.HasValue)
                {
                    return query.Value;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return token.Split(" ")[1];
            }
        }

       
    }
}