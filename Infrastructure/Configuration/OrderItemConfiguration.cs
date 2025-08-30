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
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.Id);

            // Një OrderItem i përket një Order-i
            builder.HasOne(oi => oi.Order)
                   .WithMany(o => o.OrderItems)
                   .HasForeignKey(oi => oi.OrderId);

            // Nëse ke lidhje me Book/Product
            builder.HasOne(oi => oi.Book) // ose Product
                   .WithMany()
                   .HasForeignKey(oi => oi.BookId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(oi => oi.Quantity)
                   .IsRequired();

            builder.Property(oi => oi.Price)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();
        }
    }
}
