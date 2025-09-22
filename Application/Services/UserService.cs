
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;

        public UserService(UserManager<User> userManager, RoleManager<Role> roleManager, AppDbContext appDbContext, IMapper mapper, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.appDbContext = appDbContext;
            this.mapper = mapper;
            _configuration = configuration;
        }

        public async Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users
                .FirstOrDefaultAsync(x => x.Email == loginModel.Email, cancellationToken);

            if (user is null)
                throw new Exception("User not found");

            if (!await userManager.CheckPasswordAsync(user, loginModel.Password))
                throw new Exception("Incorrect password");

            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("sub", user.Id.ToString())
            };

            var userRoles = await userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
                authClaims.Add(new Claim(ClaimTypes.Role, role));

            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            IdentityModelEventSource.ShowPII = true;

            var userData = mapper.Map<UserModel>(user);
            if (userRoles.Contains("Admin")) userData.Role = Domain.Enum.UserRoleEnum.Admin;
            else if (userRoles.Contains("Coordinator")) userData.Role = Domain.Enum.UserRoleEnum.Coordinator;

            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddHours(16);
            await appDbContext.SaveChangesAsync(cancellationToken);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            var response = new AuthenticationModel()
            {
                Token = jwtToken,
                RefreshToken = refreshToken,
                ExpiresAt = token.ValidTo,
                UserData = userData!,
                UserRole = userRoles.FirstOrDefault()!
            };

            return response;
        }

        public async Task<AuthenticationModel> RefreshTokenAsync(RefreshTokenRequest model)
        {
            var user = await appDbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == model.RefreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var newJwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            var newRefreshToken = GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddHours(2);
            await appDbContext.SaveChangesAsync();

            return new AuthenticationModel
            {
                Token = newJwtToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = token.ValidTo,
                UserData = mapper.Map<UserModel>(user),
                UserRole = userRoles.FirstOrDefault()!
            };
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        //public async Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken)
        //{
        //    User user;

        //    if (!model.Id.HasValue)
        //    {
        //        user = new User
        //        {

        //        };
        //            user.UserName = model.UserName;
        //            user.LastName = model.LastName;
        //            user.Email = model.Email;
        //            user.Address = model.Address;

        //        var result = await userManager.CreateAsync(user, model.Password);
        //        if (!result.Succeeded)
        //        {
        //            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
        //            throw new Exception($"User creation failed: {errors}");
        //        }
        //    }
        //    else
        //    {
        //        user = await userManager.Users.FirstOrDefaultAsync(u => u.Id == model.Id, cancellationToken);
        //        if (user is null)
        //            throw new Exception("User not found.");

        //        user.UserName = model.UserName;
        //        user.LastName = model.LastName;
        //        user.Email = model.Email;
        //        user.Address = model.Address;

        //        var roles = await userManager.GetRolesAsync(user);
        //        await userManager.RemoveFromRolesAsync(user, roles);

        //        if (!string.IsNullOrWhiteSpace(model.Password))
        //        {
        //            await userManager.RemovePasswordAsync(user);
        //            await userManager.AddPasswordAsync(user, model.Password);
        //        }

        //        appDbContext.Users.Update(user);
        //    }

        //    var role = model.Role?.ToString();

        //    if (!await roleManager.RoleExistsAsync(role))
        //        await roleManager.CreateAsync(new Role { Name = role });

        //    await userManager.AddToRoleAsync(user, role);

        //    await appDbContext.SaveChangesAsync(cancellationToken);
        //    return model;
        //}
        public async Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken)
        {
            User user;

            if (!model.Id.HasValue)
            {
                user = new User
                {
                    UserName = model.UserName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Address = model.Address
                };

                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                    throw new Exception($"User creation failed: {errors}");
                }

                // rifresko user-in që të ketë Id
                user = await userManager.FindByNameAsync(user.UserName);
            }
            else
            {
                user = await userManager.FindByIdAsync(model.Id.ToString());
                if (user is null)
                    throw new Exception("User not found.");

                user.UserName = model.UserName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Address = model.Address;

                // update me userManager
                var updateResult = await userManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    var errors = string.Join("; ", updateResult.Errors.Select(e => e.Description));
                    throw new Exception($"User update failed: {errors}");
                }

                var roles = await userManager.GetRolesAsync(user);
                await userManager.RemoveFromRolesAsync(user, roles);

                if (!string.IsNullOrWhiteSpace(model.Password))
                {
                    await userManager.RemovePasswordAsync(user);
                    await userManager.AddPasswordAsync(user, model.Password);
                }
            }

            // role si string nga enum
            if (model.Role.HasValue)
            {
                var roleName = model.Role.Value.ToString();

                if (!await roleManager.RoleExistsAsync(roleName))
                    await roleManager.CreateAsync(new Role { Name = roleName });

                await userManager.AddToRoleAsync(user, roleName);
            }

            return model;
        }






















        public async Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users
                .Include(x => x.UserRoles)
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync(cancellationToken);

            if (user is null)
            {
                throw new Exception("User not found");
            }
            var roles = await userManager.GetRolesAsync(user);
            var model = mapper.Map<UserModel>(user);

            if (roles.Any(x => x == "Admin"))
            {
                model.Role = Domain.Enum.UserRoleEnum.Admin;
            }
            else if (roles.Any(x => x == "Coordinator"))
            {
                model.Role = Domain.Enum.UserRoleEnum.Coordinator;
            }

            return model;
        }



        public async Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var users = await appDbContext.Users.ToListAsync(cancellationToken);
            var userModels = new List<UserModel>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                var model = mapper.Map<UserModel>(user);

                if (roles.Contains("Admin"))
                    model.Role = Domain.Enum.UserRoleEnum.Admin;
                else if (roles.Contains("Coordinator"))
                    model.Role = Domain.Enum.UserRoleEnum.Coordinator;

                userModels.Add(model);
            }

            return userModels;
        }

        public async Task DeleteUser(Guid Id, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(Id.ToString());

            if (user != null)
            {
                var result = await userManager.DeleteAsync(user);

                if (!result.Succeeded)
                {
                    var errorMessages = string.Join(", ", result.Errors.Select(e => e.Description));
                    throw new Exception($"Dështoi për fshirjen e përdoruesit: {errorMessages}");
                }
            }
            else
            {
                throw new Exception("Përdoruesi nuk u gjet për fshirje.");
            }
        }

        public async Task<List<UserModel>> GetAllAdminsAsync(CancellationToken cancellationToken)
        {
            var adminUsers = await userManager.GetUsersInRoleAsync("Admin");

            var models = new List<UserModel>();

            foreach (var user in adminUsers)
            {
                var model = mapper.Map<UserModel>(user);
                model.Role = Domain.Enum.UserRoleEnum.Admin;

                models.Add(model);
            }

            return models;
        }
    }
}

