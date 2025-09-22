
//using Domain.Entities;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//namespace Infrastructure.Configuration
//{
//    public class UserConfiguration : IEntityTypeConfiguration<User>
//    {
//        public void Configure(EntityTypeBuilder<User> builder)
//        {
//            // Çelësi primar
//            builder.HasKey(u => u.Id);

//            // Fushat required dhe max length
//            builder.Property(u => u.Username)
//                   .IsRequired()
//                   .HasMaxLength(50);

//            builder.Property(u => u.Email)
//                   .IsRequired()
//                   .HasMaxLength(100);

//            builder.Property(u => u.PasswordHash)
//                   .IsRequired();

//            // Marrëdhënia me UserRole
//            builder.HasMany(u => u.UserRoles)
//                   .WithOne(ur => ur.User)
//                   .HasForeignKey(ur => ur.UserId)
//                   .OnDelete(DeleteBehavior.Restrict);

//            // Nëse do, mund të vendosësh unique constraints
//            builder.HasIndex(u => u.Username).IsUnique();
//            builder.HasIndex(u => u.Email).IsUnique();
//        }
//    }
//}


using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Çelësi primar (IdentityUser e ka tashmë, nuk është nevoja të ri-deklarohet)
            builder.HasKey(u => u.Id);

            // Fushat e reja që ke shtuar
            builder.Property(u => u.LastName)
                   .IsRequired()
                   .HasMaxLength(50);

            //builder.Property(u => u.Email)
            //       .IsRequired()
            //       .HasMaxLength(100);

            builder.Property(u => u.Address)
                   .HasMaxLength(200);

            builder.Property(u => u.RefreshToken)
                   .HasMaxLength(200);

            // Relacioni me UserRoles
            builder.HasMany(u => u.UserRoles)
                   .WithOne(ur => ur.User)
                   .HasForeignKey(ur => ur.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Optional: Index/Unik për UserName dhe PersonalEmail
            builder.HasIndex(u => u.UserName).IsUnique();
            builder.HasIndex(u => u.Email).IsUnique();
        }
    }
}
