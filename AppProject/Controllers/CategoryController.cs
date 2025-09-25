using Application.Services;
using AutoMapper;
//using AutoMapper.Execution;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService service;

        public CategoryController(ICategoryService categoryService)
        {
            service = categoryService;
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
            var category = await service.GetById(id, cancellationToken);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        // POST: api/Category
        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateOrUpdate(CategoryModel model, CancellationToken cancellationToken)
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
        [HttpGet("GetCategorySelectListAsync")]
        public async Task<IActionResult> GetCategorySelectListAsync(CancellationToken cancellationToken)
        {
            var model = await service.GetCategorySelectListAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("GetBooksByCategory")]
        public async Task<IActionResult> GetBooksByCategory(CancellationToken cancellationToken)
        {
            var result = await service.GetBooksByCategory(cancellationToken);
            return Ok(result);
        }
    }
}
