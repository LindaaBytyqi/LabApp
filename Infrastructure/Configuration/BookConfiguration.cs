using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(x => x.Description)
                   .HasMaxLength(1000);

            builder.Property(x => x.Price)
                   .HasColumnType("decimal(18,2)");

            builder.Property(x => x.PhotoUrl)
                   .HasMaxLength(500);

            // One-to-many: Book -> Category
            builder.HasOne(x => x.Category)
                   .WithMany(c => c.Books)
                   .HasForeignKey(x => x.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Many-to-many via BookAuthor
            builder.HasMany(x => x.BookAuthors)
                   .WithOne(ba => ba.Book)
                   .HasForeignKey(ba => ba.BookId);
        }
    }
}
