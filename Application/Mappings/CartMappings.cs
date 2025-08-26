using AutoMapper;
using Domain.Entities;
using Domain.Model;

namespace Application.Mappings
{
    public class CartMappings : Profile
    {
        public CartMappings()
        {
            // CartItem ↔ CartItemModel
            CreateMap<CartItem, CartItemModel>()
                .ForMember(x => x.BookId, y => y.MapFrom(x => x.BookId))
                .ForMember(x => x.Quantity, y => y.MapFrom(x => x.Quantity))
                .ForMember(x => x.Title, y => y.MapFrom(x => x.Book.Title))
                .ForMember(x => x.Category, y => y.MapFrom(x => x.Book.Category.Name))
                .ForMember(x => x.Price, y => y.MapFrom(x => x.Book.Price));

            CreateMap<CartItemModel, CartItem>()
                .ForMember(x => x.BookId, y => y.MapFrom(x => x.BookId))
                .ForMember(x => x.Quantity, y => y.MapFrom(x => x.Quantity))
                .ForMember(x => x.Book, y => y.Ignore())
                .ForMember(x => x.Id, y => y.Ignore())
                .ForMember(x => x.CartId, y => y.Ignore())
                .ForMember(x => x.Cart, y => y.Ignore());

            // Cart ↔ CartModel
            CreateMap<Cart, CartModel>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
                .ForMember(x => x.Items, y => y.MapFrom(x => x.CartItems));

            CreateMap<CartModel, Cart>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(x => x.UserId))
                .ForMember(x => x.CartItems, y => y.MapFrom(x => x.Items));
        }
    }
}
