using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserService
    {
        Task DeleteUser(Guid userId, CancellationToken cancellationToken);
        Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken);
        Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditUserAsync(UserModel model, CancellationToken cancellationToken);
        Task<AuthenticationModel> RefreshTokenAsync(RefreshTokenRequest model);
        Task<List<UserModel>> GetAllAdminsAsync(CancellationToken cancellationToken);
    }
}
