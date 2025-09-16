using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configuration
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            //builder.HasKey(x => new { x.UserId, x.RoleId });
            ////builder.HasKey(x => x.Id);
            //builder.HasOne(ur => ur.User)
            //       .WithMany(u => u.UserRoles)
            //       .HasForeignKey(ur => ur.UserId)
            //         .OnDelete(DeleteBehavior.Restrict);


            //builder.HasOne(ur => ur.Role)
            //    .WithMany(r => r.UserRoles)
            //    .HasForeignKey(ur => ur.RoleId)
            //     .OnDelete(DeleteBehavior.Restrict);


            //builder.HasKey(ur => new { ur.UserId, ur.RoleId }); // <- ky është primary key

            builder.HasOne(ur => ur.User)
                   .WithMany(u => u.UserRoles)
                   .HasForeignKey(ur => ur.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(ur => ur.Role)
                   .WithMany(r => r.UserRoles)
                   .HasForeignKey(ur => ur.RoleId)
                   .OnDelete(DeleteBehavior.Restrict);

        }
    }
}