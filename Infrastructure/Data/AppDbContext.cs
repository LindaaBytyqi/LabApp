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



//using Domain.Entities;
//using Infrastructure.Configuration;
//using Microsoft.EntityFrameworkCore;

//namespace Infrastructure.Data
//{
//    public class AppDbContext : DbContext
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
//        {
//        }

//        public DbSet<User> Users { get; set; }
//        public DbSet<Role> Roles { get; set; }
//        public DbSet<UserRole> UserRoles { get; set; }
//        public DbSet<Book> Books { get; set; }
//        public DbSet<Author> Authors { get; set; }
//        public DbSet<Category> Categories { get; set; }
//        public DbSet<BookAuthor> BookAuthors { get; set; }
//        public DbSet<Publisher> Publishers { get; set; }
//        public DbSet<Cart> Carts { get; set; }
//        public DbSet<CartItem> CartItems { get; set; }

//        public DbSet<Order> Orders { get; set; }
//        public DbSet<OrderItem>OrderItems { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            base.OnModelCreating(modelBuilder);

//            // Konfigurimi për Many-to-Many Book <-> Author
//            modelBuilder.ApplyConfiguration(new BookAuthorConfiguration());
//            modelBuilder.ApplyConfiguration(new BookConfiguration());
//            modelBuilder.ApplyConfiguration(new AuthorConfiguration());
//            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
//            modelBuilder.ApplyConfiguration(new PublisherConfiguration());
//            modelBuilder.ApplyConfiguration(new CartConfiguration());
//            modelBuilder.ApplyConfiguration(new CartItemConfiguration());
//            modelBuilder.ApplyConfiguration(new OrderConfiguration());
//            modelBuilder.ApplyConfiguration(new OrderItemConfiguration());

//            modelBuilder.ApplyConfiguration(new UserRoleConfiguration());
//            modelBuilder.ApplyConfiguration(new UserConfiguration());
//            modelBuilder.ApplyConfiguration(new RoleConfiguration());
//        }
//    }
//}



/////////------------------
//using Domain.Entities;
//using Infrastructure.Configuration;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;

//namespace Infrastructure.Data
//{
//    public class AppDbContext : IdentityDbContext<User, Role, Guid>
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
//        {
//        }

//        protected override void OnModelCreating(ModelBuilder builder)
//        {
//            base.OnModelCreating(builder);
//            builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

//            // konfigurim për UserRole (join table)
//            //builder.Entity<IdentityUserRole<Guid>>()
//            //       .HasKey(x => new { x.UserId, x.RoleId });

//            // builder.ApplyConfiguration(new UserRoleConfiguration());
//            builder.ApplyConfiguration(new UserConfiguration());
//            builder.ApplyConfiguration(new RoleConfiguration());

//            // nëse do të kesh student/staff/koordinator si në projektin tjetër:
//            // builder.Entity<Student>().HasBaseType<User>();
//        }

//        // këtu vendos DbSet për entitetet që nuk janë të Identity
//        public DbSet<Book> Books { get; set; }
//        public DbSet<Author> Authors { get; set; }
//        public DbSet<Category> Categories { get; set; }
//        public DbSet<BookAuthor> BookAuthors { get; set; }
//        public DbSet<Publisher> Publishers { get; set; }
//        public DbSet<Cart> Carts { get; set; }
//        public DbSet<CartItem> CartItems { get; set; }
//        public DbSet<Order> Orders { get; set; }
//        public DbSet<OrderItem> OrderItems { get; set; }
//    }
//}
