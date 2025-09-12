
using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService service;
        public AuthorController(IAuthorService authorService)
        {
            this.service = authorService;
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

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateOrUpdate(AuthorModel model, CancellationToken cancellationToken)
        {
            var author = await service.CreateOrUpdate(model, cancellationToken);

            return Ok(author);
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

        [HttpGet("countAuthors")]
        public async Task<IActionResult> GetAuthorsCount(CancellationToken cancellationToken)
        {
            var count = await service.GetAuthorsCount(cancellationToken);
            return Ok(count);
        }
    }
}
