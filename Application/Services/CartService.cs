using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CartService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CartModel> GetCart(Guid userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(i => i.Book)
                    .ThenInclude(b => b.Category)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return new CartModel
                {
                    UserId = userId,
                    Items = new List<CartItemModel>()
                };
            }

            // ✅ Map direkt me AutoMapper
            return _mapper.Map<CartModel>(cart);
        }

        //public async Task AddToCart(Guid userId, CartItemModel model)
        //{
        //    var cart = await _context.Carts
        //        .Include(c => c.CartItems)
        //        .FirstOrDefaultAsync(c => c.UserId == userId);

        //    if (cart == null)
        //    {
        //        cart = new Cart { Id = Guid.NewGuid(), UserId = userId };
        //        _context.Carts.Add(cart);
        //    }

        //    var existing = cart.CartItems.FirstOrDefault(i => i.BookId == model.BookId);
        //    if (existing != null)
        //    {
        //        existing.Quantity += model.Quantity;
        //    }
        //    else
        //    {
        //        // ✅ Mapim direkt nga CartItemModel → CartItem
        //        var cartItem = _mapper.Map<CartItem>(model);
        //        cartItem.Id = Guid.NewGuid();
        //        cart.CartItems.Add(cartItem);
        //    }

        //    await _context.SaveChangesAsync();
        //}

        public async Task AddToCart(Guid userId, CartItemModel model)
        {
            // Kontrollo nëse ekziston user-i (edhe pse është guest)
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                user = new User
                {
                    Id = userId,
                    UserName = $"guest-{userId.ToString().Substring(0, 8)}",
                    Email = $"guest-{userId}@guest.com",
                    IsGuest = true // duhet të kesh këtë property te entiteti User
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Kontrollo nëse ekziston cart për këtë user
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { Id = Guid.NewGuid(), UserId = userId };
                _context.Carts.Add(cart);
            }

            // Kontrollo nëse libri ekziston në cart
            var existing = cart.CartItems.FirstOrDefault(i => i.BookId == model.BookId);
            if (existing != null)
            {
                existing.Quantity += model.Quantity;
            }
            else
            {
                // Mapim nga CartItemModel → CartItem
                var cartItem = _mapper.Map<CartItem>(model);
                cartItem.Id = Guid.NewGuid();
                cart.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();
        }


        public async Task RemoveFromCart(Guid userId, Guid bookId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return;

            var item = cart.CartItems.FirstOrDefault(i => i.BookId == bookId);
            if (item != null)
            {
                cart.CartItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ClearCart(Guid userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return;

            cart.CartItems.Clear();
            await _context.SaveChangesAsync();
        }
    }
}

























////////////////////////////////mire edhe kjo eshte vetem se eshte pa perdor automapper
//using AutoMapper;
//using Domain.Entities;
//using Domain.Interfaces;
//using Domain.Model;
//using Infrastructure.Data;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Application.Services
//{
//    public class CartService : ICartService
//    {
//        private readonly AppDbContext _context;
//        private readonly IMapper _mapper;

//        public CartService(AppDbContext context, IMapper mapper)
//        {
//            _context = context;
//            _mapper = mapper;
//        }

//        public async Task<CartModel> GetCart(Guid userId)
//        {
//            var cart = await _context.Carts
//                .Include(c => c.CartItems)
//                    .ThenInclude(i => i.Book)
//                    .ThenInclude(b => b.Category)
//                .FirstOrDefaultAsync(c => c.UserId == userId);

//            if (cart == null)
//            {
//                return new CartModel
//                {
//                    UserId = userId,
//                    Items = new System.Collections.Generic.List<CartItemModel>()
//                };
//            }

//            return new CartModel
//            {
//                Id = cart.Id,
//                UserId = cart.UserId,
//                Items = cart.CartItems.Select(i => new CartItemModel
//                {
//                    BookId = i.BookId,
//                    Quantity = i.Quantity,
//                    Title = i.Book.Title,
//                    Category = i.Book.Category.Name,
//                    Price = i.Book.Price
//                }).ToList()
//            };
//        }

//        public async Task AddToCart(Guid userId, CartItemModel model)
//        {
//            var cart = await _context.Carts
//                .Include(c => c.CartItems)
//                .FirstOrDefaultAsync(c => c.UserId == userId);

//            if (cart == null)
//            {
//                cart = new Cart
//                {
//                    Id = Guid.NewGuid(),
//                    UserId = userId
//                };
//                _context.Carts.Add(cart);
//            }

//            var existing = cart.CartItems.FirstOrDefault(i => i.BookId == model.BookId);
//            if (existing != null)
//            {
//                existing.Quantity += model.Quantity;
//            }
//            else
//            {
//                cart.CartItems.Add(new CartItem
//                {
//                    Id = Guid.NewGuid(),
//                    BookId = model.BookId,
//                    Quantity = model.Quantity
//                });
//            }

//            await _context.SaveChangesAsync();
//        }

//        public async Task RemoveFromCart(Guid userId, Guid bookId)
//        {
//            var cart = await _context.Carts
//                .Include(c => c.CartItems)
//                .FirstOrDefaultAsync(c => c.UserId == userId);

//            if (cart == null) return;

//            var item = cart.CartItems.FirstOrDefault(i => i.BookId == bookId);
//            if (item != null)
//            {
//                cart.CartItems.Remove(item);
//                await _context.SaveChangesAsync();
//            }
//        }

//        public async Task ClearCart(Guid userId)
//        {
//            var cart = await _context.Carts
//                .Include(c => c.CartItems)
//                .FirstOrDefaultAsync(c => c.UserId == userId);

//            if (cart == null) return;

//            cart.CartItems.Clear();
//            await _context.SaveChangesAsync();
//        }
//    }
//}

