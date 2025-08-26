using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;

        public CartController(ICartService cartService)
        {
            _service = cartService;
        }

        // GET: api/Cart/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(Guid userId)
        {
            var cart = await _service.GetCart(userId);
            return Ok(cart);
        }

        // POST: api/Cart/{userId}
        [HttpPost("{userId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddToCart(Guid userId, [FromBody] CartItemModel model)
        {
            await _service.AddToCart(userId, model);
            return Ok();
        }

        // DELETE: api/Cart/{userId}/{bookId}
        [HttpDelete("{userId}/{bookId}")]
        public async Task<IActionResult> RemoveFromCart(Guid userId, Guid bookId)
        {
            await _service.RemoveFromCart(userId, bookId);
            return Ok();
        }

        // DELETE: api/Cart/clear/{userId}
        [HttpDelete("clear/{userId}")]
        public async Task<IActionResult> ClearCart(Guid userId)
        {
            await _service.ClearCart(userId);
            return Ok();
        }
    }
}
