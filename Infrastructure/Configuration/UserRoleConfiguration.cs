using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            // Çelësi primar kompozit
            //builder.HasKey(x => new { x.UserId, x.RoleId });

            // Marrëdhënia me User
            builder.HasOne(x => x.User)
                   .WithMany(u => u.UserRoles)
                   .HasForeignKey(x => x.UserId);

            // Marrëdhënia me Role
            builder.HasOne(x => x.Role)
                   .WithMany(r => r.UserRoles)
                   .HasForeignKey(x => x.RoleId);
        }
    }
}
