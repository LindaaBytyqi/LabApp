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
//            // Map nga Book -> BookModel
//            CreateMap<Book, BookModel>()
//                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
//                .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
//                .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
//                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
//                .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
//                .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
//                .ForMember(x => x.CategoryName, y => y.MapFrom(x => x.Category.Name))
//                .ForMember(x => x.Authors,
//                    y => y.MapFrom(x => x.BookAuthors
//                        .Select(ba => new AuthorModel
//                        {
//                            Id = ba.Author.Id,
//                            Name = ba.Author.Name
//                        }).ToList()
//                    ));

//            // Map nga BookModel -> Book
//            CreateMap<BookModel, Book>()
//                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
//                .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
//                .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
//                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
//                .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
//                .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
//                .ForMember(x => x.BookAuthors,
//                    y => y.MapFrom(x => x.Authors
//                        .Select(a => new BookAuthor
//                        {
//                            AuthorId = a.Id
//                        }).ToList()
//                    ))
//                .ForMember(x => x.Category, y => y.Ignore());
//        }
//    }
//}

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


            CreateMap<Book, BookModel>()
    .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
    .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
    .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
    .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
    .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
    .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
    .ForMember(x => x.PublisherId, y => y.MapFrom(x => x.PublisherId))
    //.ForMember(x => x.CategoryName, y => y.MapFrom(x => x.Category != null ? x.Category.Name : string.Empty))
    .ForMember(x => x.AuthorIds, y => y.MapFrom(x => x.BookAuthors != null
        ? x.BookAuthors.Select(ba => ba.AuthorId).ToList()
        : new List<Guid>()));

            // Map nga BookModel -> Book
            CreateMap<BookModel, Book>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
                .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
                .ForMember(x => x.Price, y => y.MapFrom(x => x.Price))
                .ForMember(x => x.PhotoUrl, y => y.MapFrom(x => x.PhotoUrl))
                .ForMember(x => x.CategoryId, y => y.MapFrom(x => x.CategoryId))
                .ForMember(x => x.PublisherId, y => y.MapFrom(x => x.PublisherId))
                .ForMember(x => x.BookAuthors, y => y.MapFrom(x => x.AuthorIds != null
                    ? x.AuthorIds.Select(aid => new BookAuthor { AuthorId = aid }).ToList()
                    : new List<BookAuthor>()))
                .ForMember(x => x.Category, y => y.Ignore())
                .ForMember(x => x.Publisher, y => y.Ignore());
        }
    }
}

