using Domain.Entities;
using Infrastructure.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Apliko konfigurimet nga assembly për të gjitha entitetet
            builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            // Vetëm UserConfiguration dhe RoleConfiguration
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());

            // Nëse keni entitete të tjera që trashëgojnë User, mund ti konfiguroni këtu
            // shembull: builder.Entity<Student>().HasBaseType<User>();
        }

        // DbSet për entitetet që nuk janë Identity
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}