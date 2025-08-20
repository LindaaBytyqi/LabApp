using AutoMapper;
//using AutoMapper.Execution;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        private readonly IPublisherService service;

        public PublisherController(IPublisherService publisherService)
        {
            service = publisherService;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var model = await service.GetAll(cancellationToken);
            return Ok(model);
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var publisher = await service.GetById(id, cancellationToken);
            if (publisher == null)
                return NotFound();

            return Ok(publisher);
        }

        // POST: api/Category
        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateOrUpdate(PublisherModel model, CancellationToken cancellationToken)
        {
            var result = await service.CreateOrUpdate(model, cancellationToken);
            return Ok(result);
        }

        // DELETE: api/Category/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await service.DeleteById(id, cancellationToken);
            return Ok();
        }

        // GET: api/Category/GetCategorySelectListAsync
        [HttpGet("GetPublisherSelectListAsync")]
        public async Task<IActionResult> GetPublisherSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await service.GetPublisherSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
