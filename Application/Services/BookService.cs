using AutoMapper;
using AutoMapper.Execution;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class BookService : IBookService
{
    private readonly AppDbContext appDbContext;
    private readonly IMapper mapper;

    public BookService(AppDbContext appDbContext, IMapper mapper)
    {
        this.appDbContext = appDbContext;
        this.mapper = mapper;
    }

    
    public async Task<BookModel> CreateOrUpdate(BookModel model, CancellationToken cancellationToken)
    {
        Book book;

        if (model.Id == Guid.Empty)
        {
            book = new Book();
            await appDbContext.Books.AddAsync(book);
        }
        else
        {
            book = await appDbContext.Books
                .Include(b => b.BookAuthors)
                .Where(x => x.Id == model.Id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        book.Title = model.Title;
        book.Description = model.Description;
        book.Price = model.Price;
        book.CategoryId = model.CategoryId;

        // Photo handling
        if (model.Photo != null && model.Photo.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}_{model.Photo.FileName}";
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

            if (!Directory.Exists(uploadFolder))
                Directory.CreateDirectory(uploadFolder);

            var filePath = Path.Combine(uploadFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.Photo.CopyToAsync(stream, cancellationToken);
            }

            book.PhotoUrl = $"/uploads/{fileName}";
        }
        else if (model.Id == Guid.Empty)
        {
            book.PhotoUrl = null;
        }

        // M:N Authors
        book.BookAuthors = model.Authors?.Select(a => new BookAuthor
        {
            AuthorId = a.Id,
            BookId = book.Id
        }).ToList();

        await appDbContext.SaveChangesAsync();

        return await GetById(book.Id, cancellationToken);
    }

    public async Task<BookModel> GetById(Guid id, CancellationToken cancellationToken)
    {
        var book = await appDbContext.Books
            .Include(b => b.BookAuthors)
                .ThenInclude(ba => ba.Author)
            .Include(b => b.Category)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);

        var model = mapper.Map<BookModel>(book);
        return model;
    }

    public async Task DeleteById(Guid id, CancellationToken cancellationToken)
    {
        var book = await appDbContext.Books.Where(x => x.Id == id).FirstOrDefaultAsync(cancellationToken);
        appDbContext.Books.Remove(book);
        await appDbContext.SaveChangesAsync();
    }

    public async Task<List<BookModel>> GetAll(CancellationToken cancellationToken)
    {
        var books = await appDbContext.Books.ToListAsync(cancellationToken);
        var model = mapper.Map<List<BookModel>>(books);
        return model;
    }

    public async Task<List<ListItemModel>> GetBookSelectListAsync(CancellationToken cancellationToken)
    {
        var model = await appDbContext.Books.Select(x => new ListItemModel()
        {
            Id = x.Id,
            Name = x.Title
        }).ToListAsync(cancellationToken);

        return model;
    }

    public async Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken)
    {
        return await appDbContext.Authors
            .Select(a => new ListItemModel
            {
                Id = a.Id,
                Name = a.Name
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<List<ListItemModel>> GetCategorySelectListAsync(CancellationToken cancellationToken)
    {
        return await appDbContext.Categories
            .Select(c => new ListItemModel
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync(cancellationToken);
    }
}


//public async Task<BookModel> CreateOrUpdate(BookModel model, CancellationToken cancellationToken)
//{
//    Book book = new Book();
//    if (model.Id == null)
//    {
//        await appDbContext.Books.AddAsync(book);
//    }
//    else
//    {
//        book = await appDbContext.Books.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
//    }

//    book.Title = model.Title;
//    book.Description = model.Description;
//    book.Price = model.Price;
//    book.AuthorId = model.AuthorId;
//    book.CategoryId = model.CategoryId;

//    if (model.Photo != null && model.Photo.Length > 0)
//    {
//        var fileName = $"{Guid.NewGuid()}_{model.Photo.FileName}";
//        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

//        if (!Directory.Exists(uploadFolder))
//            Directory.CreateDirectory(uploadFolder);

//        var filePath = Path.Combine(uploadFolder, fileName);
//        using (var stream = new FileStream(filePath, FileMode.Create))
//        {
//            await model.Photo.CopyToAsync(stream, cancellationToken);
//        }

//        book.PhotoUrl = $"/uploads/{fileName}";
//    }
//    else if (model.Id == null)
//    {
//        book.PhotoUrl = null; // në krijim pa foto
//    }

//    await appDbContext.SaveChangesAsync();

//    return await GetById(book.Id, cancellationToken);
//}

//public async Task<BookModel> GetById(Guid id, CancellationToken cancellationToken)
//{
//    //var book = await appDbContext.Books.Where(x => x.Id == id).FirstOrDefaultAsync(cancellationToken);
//    //var model = mapper.Map<BookModel>(book);
//    //return model;
//    var book = await appDbContext.Books
//    .Include(b => b.Author)
//    .Include(b => b.Category)
//    .Where(x => x.Id == id)
//    .FirstOrDefaultAsync(cancellationToken);

//    var model = mapper.Map<BookModel>(book);
//    return model;
//}