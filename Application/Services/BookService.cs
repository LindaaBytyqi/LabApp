using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class BookService : IBookService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public BookService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BookModel> CreateOrUpdate(BookModel model, CancellationToken cancellationToken)
    {
        Book book;

        if (model.Id.HasValue && model.Id != Guid.Empty)
        {
            book = await _context.Books
                        .Include(b => b.BookAuthors)
                        .FirstOrDefaultAsync(b => b.Id == model.Id, cancellationToken);

            if (book == null)
                throw new Exception("Book not found.");

            // Hiq autorët e vjetër për të zëvendësuar me të zgjedhurit
            book.BookAuthors.Clear();
        }
        else
        {
            // 🔹 Libr i ri
            book = new Book { Id = Guid.NewGuid() };
            await _context.Books.AddAsync(book, cancellationToken);
        }

        // 🔹 Properties
        book.Title = model.Title;
        book.Description = model.Description;
        book.Price = model.Price;
        book.ISBN = model.ISBN;
        book.PublishedDate = model.PublishedDate;
        book.StockQty = model.StockQty;
        book.PublisherId = model.PublisherId;
        book.CategoryId = model.CategoryId;

        // 🔹 Foto (e paprekur nga kodi yt origjinal)
        if (model.Photo != null && model.Photo.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}_{model.Photo.FileName}";
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            if (!Directory.Exists(uploadFolder))
                Directory.CreateDirectory(uploadFolder);

            var filePath = Path.Combine(uploadFolder, fileName);
            using var stream = new FileStream(filePath, FileMode.Create);
            await model.Photo.CopyToAsync(stream, cancellationToken);

            book.PhotoUrl = $"/uploads/{fileName}";
        }
        else if (model.Id == Guid.Empty)
        {
            book.PhotoUrl = null;
        }

        // 🔹 M:N Authors
        if (model.AuthorIds != null && model.AuthorIds.Count > 0)
        {
            book.BookAuthors = model.AuthorIds.Select(aId => new BookAuthor
            {
                AuthorId = aId,
                BookId = book.Id
            }).ToList();
        }

        await _context.SaveChangesAsync(cancellationToken);

        return await GetById(book.Id, cancellationToken);
    }

    public async Task<BookModel> GetById(Guid id, CancellationToken cancellationToken)
    {
        var book = await _context.Books
                        .Include(b => b.BookAuthors)
                            .ThenInclude(ba => ba.Author)
                        .Include(b => b.Category)
                        .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);

        return _mapper.Map<BookModel>(book);
    }

    public async Task<List<BookModel>> GetAll(CancellationToken cancellationToken)
    {
        var books = await _context.Books
                        .Include(b => b.BookAuthors)
                        .Include(b => b.Category)
                        .ToListAsync(cancellationToken);

        return _mapper.Map<List<BookModel>>(books);
    }

    public async Task DeleteById(Guid id, CancellationToken cancellationToken)
    {
        var book = await _context.Books
                        .Include(b => b.BookAuthors)
                        .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);

        if (book != null)
        {
            _context.Books.Remove(book);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    // Select Lists
    public async Task<List<ListItemModel>> GetBookSelectListAsync(CancellationToken cancellationToken)
    {
        return await _context.Books
                    .Select(b => new ListItemModel { Id = b.Id, Name = b.Title })
                    .ToListAsync(cancellationToken);
    }

    public async Task<List<ListItemModel>> GetAuthorSelectListAsync(CancellationToken cancellationToken)
    {
        return await _context.Authors
                    .Select(a => new ListItemModel { Id = a.Id, Name = a.Name })
                    .ToListAsync(cancellationToken);
    }

    public async Task<List<ListItemModel>> GetCategorySelectListAsync(CancellationToken cancellationToken)
    {
        return await _context.Categories
                    .Select(c => new ListItemModel { Id = c.Id, Name = c.Name })
                    .ToListAsync(cancellationToken);
    }
    public async Task<List<ListItemModel>> GetPublisherSelectListAsync(CancellationToken cancellationToken)
    {
        return await _context.Publishers
                    .Select(c => new ListItemModel { Id = c.Id, Name = c.Name })
                    .ToListAsync(cancellationToken);
    }
}
