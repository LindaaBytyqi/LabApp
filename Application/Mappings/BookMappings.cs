using AutoMapper;
using Domain.Entities;
using Domain.Model;
using System.Linq;

namespace Application.Mappings
{
    public class BookMappings : Profile
    {
        public BookMappings()
        {
            // Map nga Book -> BookModel
            CreateMap<Book, BookModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.StockQty, opt => opt.MapFrom(src => src.StockQty))
                .ForMember(dest => dest.PublishedDate, opt => opt.MapFrom(src => src.PublishedDate))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.PhotoUrl))
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.PublisherId, opt => opt.MapFrom(src => src.PublisherId))

                // Merr emrat për shfaqje, jo për DB
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.PublisherName, opt => opt.MapFrom(src => src.Publisher != null ? src.Publisher.Name : string.Empty))
                .ForMember(dest => dest.AuthorIds, opt => opt.MapFrom(src => src.BookAuthors != null
                    ? src.BookAuthors.Select(ba => ba.AuthorId).ToList()
                    : new List<Guid>()))
                .ForMember(dest => dest.AuthorNames, opt => opt.MapFrom(src => src.BookAuthors != null
                    ? src.BookAuthors.Select(ba => ba.Author.Name).ToList()
                    : new List<string>()));

            // Map nga BookModel -> Book
            CreateMap<BookModel, Book>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id ?? Guid.NewGuid()))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.StockQty, opt => opt.MapFrom(src => src.StockQty))
                .ForMember(dest => dest.PublishedDate, opt => opt.MapFrom(src => src.PublishedDate))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.PhotoUrl))
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.PublisherId, opt => opt.MapFrom(src => src.PublisherId))

                // BookAuthors krijohen nga AuthorIds
                .ForMember(dest => dest.BookAuthors, opt => opt.MapFrom(src => src.AuthorIds != null
                    ? src.AuthorIds.Select(aid => new BookAuthor { AuthorId = aid }).ToList()
                    : new List<BookAuthor>()))

                // Mos prekim këto, nuk duhet map në DB
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.Publisher, opt => opt.Ignore())
                .ForMember(dest => dest.AuthorNames, opt => opt.Ignore()); // nuk ka nevojë në entity
        }
    }
}





//using AutoMapper;
//using Domain.Entities;
//using Domain.Model;
//using System.Linq;

//namespace Application.Mappings
//{
//    public class BookMappings : Profile
//    {
//        public BookMappings()
//        {


//            CreateMap<Book, BookModel>()
//    .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
//    .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
//    .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
//    .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
//    .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
//    .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
//    .ForMember(x => x.PublisherId, y => y.MapFrom(x => x.PublisherId))
//    //.ForMember(x => x.CategoryName, y => y.MapFrom(x => x.Category != null ? x.Category.Name : string.Empty))
//    .ForMember(x => x.AuthorIds, y => y.MapFrom(x => x.BookAuthors != null
//        ? x.BookAuthors.Select(ba => ba.AuthorId).ToList()
//        : new List<Guid>()));

//            // Map nga BookModel -> Book
//            CreateMap<BookModel, Book>()
//                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
//                .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
//                .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
//                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
//                .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
//                .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
//                .ForMember(x => x.PublisherId, y => y.MapFrom(x => x.PublisherId))
//                .ForMember(x => x.BookAuthors, y => y.MapFrom(x => x.AuthorIds != null
//                    ? x.AuthorIds.Select(aid => new BookAuthor { AuthorId = aid }).ToList()
//                    : new List<BookAuthor>()))
//                .ForMember(x => x.Category, y => y.Ignore())
//                .ForMember(x => x.Publisher, y => y.Ignore());
//        }
//    }
//}

