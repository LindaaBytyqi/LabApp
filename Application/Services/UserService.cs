using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        // ➤ CRUD
        public async Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.Id, cancellationToken);

            if (entity == null) // Insert
            {
                entity = _mapper.Map<User>(model);
                entity.Id = Guid.NewGuid();
                _context.Users.Add(entity);
            }
            else // Update
            {
                _mapper.Map(model, entity);
                _context.Users.Update(entity);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<UserModel>(entity);
        }

        public async Task DeleteUser(Guid userId, CancellationToken cancellationToken)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            if (entity == null)
                throw new Exception("User not found.");

            _context.Users.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            return _mapper.Map<UserModel>(entity);
        }

        public async Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var users = await _context.Users.ToListAsync(cancellationToken);
            return _mapper.Map<List<UserModel>>(users);
        }

        public async Task<List<UserModel>> GetAllAdminsAsync(CancellationToken cancellationToken)
        {
            var admins = await _context.Users.Where(u => u.Role == "Admin").ToListAsync(cancellationToken);
            return _mapper.Map<List<UserModel>>(admins);
        }

        // ➤ Autentifikimi
        public async Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                u => u.Email == loginModel.Email && u.Password == loginModel.Password, // (password duhet hashed)
                cancellationToken);

            if (user == null)
                throw new Exception("Invalid credentials.");

            return GenerateJwtToken(user);
        }

        public async Task<AuthenticationModel> RefreshTokenAsync(RefreshTokenRequest model, CancellationToken cancellationToken)
        {
            // kontrollo RefreshToken në DB (nëse e ruan)
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == model.RefreshToken, cancellationToken);

            if (user == null || user.RefreshTokenExpiry < DateTime.UtcNow)
                throw new Exception("Invalid or expired refresh token.");

            return GenerateJwtToken(user);
        }

      
      
    }
}
