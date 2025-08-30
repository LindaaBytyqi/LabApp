//using AutoMapper;
//using Domain.Entities;
//using Domain.Model;

//namespace Application.Mappings
//{
//    public class OrderMappings : Profile
//    {
//        public OrderMappings()
//        {
//            // OrderItem ↔ OrderItemModel
//            CreateMap<OrderItem, OrderItemModel>()
//                .ForMember(x => x.Title, y => y.MapFrom(x => x.Book.Title))
//                .ForMember(x => x.Quantity, y => y.MapFrom(x => x.Quantity))
//                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price));

//            CreateMap<OrderItemModel, OrderItem>()
//                .ForMember(x => x.Quantity, y => y.MapFrom(x => x.Quantity))
//                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
//                .ForMember(x => x.Book, y => y.Ignore())
//                .ForMember(x => x.Id, y => y.Ignore())
//                .ForMember(x => x.OrderId, y => y.Ignore())
//                .ForMember(x => x.Order, y => y.Ignore());

//            // Order ↔ OrderModel
//            CreateMap<Order, OrderModel>()
//                .ForMember(x => x.OrderId, y => y.MapFrom(x => x.Id))
//                .ForMember(x => x.FullName, y => y.MapFrom(x => x.FullName))
//                .ForMember(x => x.Email, y => y.MapFrom(x => x.Email))
//                .ForMember(x => x.Phone, y => y.MapFrom(x => x.Phone))
//                .ForMember(x => x.Address, y => y.MapFrom(x => x.Address))
//                .ForMember(x => x.City, y => y.MapFrom(x => x.City))
//                .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode))
//                .ForMember(x => x.TotalPrice, y => y.MapFrom(x => x.TotalPrice))
//                .ForMember(x => x.CreatedAt, y => y.MapFrom(x => x.CreatedAt))
//                .ForMember(x => x.OrderItems, y => y.MapFrom(x => x.OrderItems));

//            CreateMap<OrderModel, Order>()
//                .ForMember(x => x.Id, y => y.MapFrom(x => x.OrderId))
//                .ForMember(x => x.FullName, y => y.MapFrom(x => x.FullName))
//                .ForMember(x => x.Email, y => y.MapFrom(x => x.Email))
//                .ForMember(x => x.Phone, y => y.MapFrom(x => x.Phone))
//                .ForMember(x => x.Address, y => y.MapFrom(x => x.Address))
//                .ForMember(x => x.City, y => y.MapFrom(x => x.City))
//                .ForMember(x => x.ZipCode, y => y.MapFrom(x => x.ZipCode))
//                .ForMember(x => x.TotalPrice, y => y.MapFrom(x => x.TotalPrice))
//                .ForMember(x => x.CreatedAt, y => y.MapFrom(x => x.CreatedAt))
//                .ForMember(x => x.OrderItems, y => y.MapFrom(x => x.OrderItems));
//        }
//    }
//}


using AutoMapper;
using Domain.Entities;
using Domain.Model;

namespace Application.Mappings
{
    public class OrderMappings : Profile
    {
        public OrderMappings()
        {
            // Mapping për OrderItem ↔ OrderItemModel (për response)
            CreateMap<OrderItem, OrderItemModel>()
                .ForMember(x => x.Title, y => y.MapFrom(src => src.Book.Title))
                .ForMember(x => x.Quantity, y => y.MapFrom(src => src.Quantity))
                .ForMember(x => x.Price, y => y.MapFrom(src => src.Price));

            // Mapping për Order ↔ OrderModel (për response)
            CreateMap<Order, OrderModel>()
                .ForMember(x => x.OrderId, y => y.MapFrom(src => src.Id))
                .ForMember(x => x.OrderItems, y => y.MapFrom(src => src.OrderItems));

            // Mapping nga CreateOrderModel → Order (për krijim)
            CreateMap<CreateOrderModel, Order>()
                .ForMember(x => x.Id, y => y.Ignore())           // EF do ta gjenerojë
                .ForMember(x => x.TotalPrice, y => y.Ignore())  // do llogaritet manual
                .ForMember(x => x.OrderItems, y => y.Ignore())  // i shtojmë manual
                .ForMember(x => x.CreatedAt, y => y.Ignore());  // EF ose DateTime.Now
        }
    }
}
