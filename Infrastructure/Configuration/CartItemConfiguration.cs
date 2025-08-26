using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.HasKey(ci => ci.Id);

            builder.Property(ci => ci.Quantity)
                   .IsRequired();

            // CartItem -> Cart
            builder.HasOne(ci => ci.Cart)
                   .WithMany(c => c.CartItems)
                   .HasForeignKey(ci => ci.CartId)
                   .OnDelete(DeleteBehavior.Cascade);

            // CartItem -> Book
            builder.HasOne(ci => ci.Book)
                   .WithMany()
                   .HasForeignKey(ci => ci.BookId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Opsional: CartItem -> User (nëse ke UserId)
            builder.HasOne(ci => ci.User)
                   .WithMany()
                   .HasForeignKey(ci => ci.UserId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
