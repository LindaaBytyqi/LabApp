﻿using AutoMapper;
using Domain.Entities;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public class PublisherMappings : Profile
    {
        public PublisherMappings()
        {
            CreateMap<PublisherModel, Publisher>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));
            //ForMember(x => x.Books, y => y.Ignore());

            CreateMap<Publisher, PublisherModel>()
                .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
                .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));
            //ForMember(x => x.Books, y => y.Ignore());
        }
    }
}
