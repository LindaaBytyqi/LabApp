//using AutoMapper;
//using Domain.Entities;
//using Domain.Interfaces;
//using Domain.Model;
//using Infrastructure.Data;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Application.Services
//{
//    public class OrderService : IOrderService
//    {
//        private readonly AppDbContext _context;
//        private readonly IMapper _mapper;

//        public OrderService(AppDbContext context, IMapper mapper)
//        {
//            _context = context;
//            _mapper = mapper;
//        }

//        public async Task<OrderModel> CreateOrderAsync(CreateOrderModel model)
//        {
//            var order = new Order
//            {
//                Name = model.Name,
//                Email = model.Email,
//                Phone = model.Phone,
//                Address = model.Address,
//                City=model.City,
//                ZipCode=model.ZipCode,
//                OrderItems = new List<OrderItem>()
//            };

//            decimal total = 0;

//            foreach (var item in model.Items)
//            {
//                var book = await _context.Books.FindAsync(item.BookId);
//                if (book == null) continue;

//                var orderItem = new OrderItem
//                {
//                    BookId = item.BookId,
//                    Quantity = item.Quantity,
//                    Price = book.Price * item.Quantity
//                };

//                total += orderItem.Price;
//                order.OrderItems.Add(orderItem);
//            }

//            order.TotalPrice = total;

//            _context.Orders.Add(order);
//            await _context.SaveChangesAsync();

//            return _mapper.Map<OrderModel>(order);
//        }

//        public async Task<List<OrderModel>> GetAllOrdersAsync()
//        {
//            var orders = await _context.Orders
//                .Include(o => o.OrderItems)
//                .ThenInclude(oi => oi.Book)
//                .ToListAsync();

//            return _mapper.Map<List<OrderModel>>(orders);
//        }

//        public async Task<OrderModel> GetOrderByIdAsync(int id)
//        {
//            var order = await _context.Orders
//                .Include(o => o.OrderItems)
//                .ThenInclude(oi => oi.Book)
//                .FirstOrDefaultAsync(o => o.Id == id);

//            return _mapper.Map<OrderModel>(order);
//        }
//    }
//}

using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderModel> CreateOrderAsync(CreateOrderModel model)
        {
            var order = _mapper.Map<Order>(model);

            decimal total = 0;
            foreach (var item in model.Items)
            {
                var book = await _context.Books.FindAsync(item.BookId);
                if (book == null) throw new Exception("Book not found!");

                var orderItem = new OrderItem
                {
                    BookId = item.BookId,
                    Quantity = item.Quantity,
                    Price = book.Price * item.Quantity
                };

                total += orderItem.Price;
                order.OrderItems.Add(orderItem);
            }

            order.TotalPrice = total;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Map entitetin në model për response
            return _mapper.Map<OrderModel>(order);
        }

        public async Task<OrderModel?> GetOrderByIdAsync(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Book)
                .FirstOrDefaultAsync(o => o.Id == id);

            return order == null ? null : _mapper.Map<OrderModel>(order);
        }

        public async Task<List<OrderModel>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Book)
                .ToListAsync();

            return _mapper.Map<List<OrderModel>>(orders);
        }
    }
}
