using AutoMapper;
using Domain.Entities;
using Domain.Model;

namespace Application.Mappings
{
    public class AuthorMappings:Profile
    {
        public AuthorMappings() 
        {
            CreateMap<Author, AuthorModel>()
    .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
    .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
    .ForMember(x => x.Bio, y => y.MapFrom(x => x.Bio))
    .ForMember(x => x.DateOfBirth, y => y.MapFrom(x => x.DateOfBirth))
    .ForMember(x => x.Country, y => y.MapFrom(x => x.Country));
            //ForMember(x => x.Books, y => y.Ignore());
            //orMember(x => x.BookId, y => y.MapFrom(x => x.BookId));

            CreateMap<AuthorModel, Author>()
      .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
    .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
    .ForMember(x => x.Bio, y => y.MapFrom(x => x.Bio))
    .ForMember(x => x.DateOfBirth, y => y.MapFrom(x => x.DateOfBirth))
    .ForMember(x => x.Country, y => y.MapFrom(x => x.Country));

        }
    }
}
