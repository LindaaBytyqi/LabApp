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
    public class PublisherConfiguration : IEntityTypeConfiguration<Publisher>
    {
        public void Configure(EntityTypeBuilder<Publisher> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasMany(c => c.Books)
                   .WithOne(b => b.Publisher)
                   .HasForeignKey(b => b.PublisherId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
