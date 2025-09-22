
using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService service;

        public BookController(IBookService bookService)
        {
            this.service = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var model = await service.GetAll(cancellationToken);
            return Ok(model);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var model = await service.GetById(id, cancellationToken);

            return Ok(model);
        }

        // Example using Entity Framework Core
      

        //[HttpPost]
        ////[Consumes("application/json")]
        //public async Task<IActionResult> CreateOrUpdate([FromForm] BookModel model, CancellationToken cancellationToken)
        //{
        //    var book = await service.CreateOrUpdate(model, cancellationToken);

        //    return Ok(book);
        //}
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromForm] BookModel model)
        {
            // Merr authorIds direkt nga FormData si koleksion string
            if (Request.Form.TryGetValue("authorIds", out var authorValues))
            {
                model.AuthorIds = authorValues.Select(a => Guid.Parse(a)).ToList();
            }

            await service.CreateOrUpdate(model, CancellationToken.None);
            return Ok(model);
        }


        [HttpGet("GetBookSelectListAsync")]
        public async Task<IActionResult> GetBookSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await service.GetBookSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetAuthors")]
        public async Task<IActionResult> GetAuthors(CancellationToken cancellationToken)
        {
            var model = await service.GetAuthorSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories(CancellationToken cancellationToken)
        {
            var model = await service.GetCategorySelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("GetPublishers")]
        public async Task<IActionResult> GetPublishers(CancellationToken cancellationToken)
        {
            var model = await service.GetPublisherSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("countBooks")]
        public async Task<IActionResult> GetBooksCount(CancellationToken cancellationToken)
        {
            var count = await service.GetBooksCount(cancellationToken);
            return Ok(count);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchBooks(string? titleTerm)
        {
            var books = await service.SearchBooks(titleTerm);
            return Ok(books);
        }

    }
}
