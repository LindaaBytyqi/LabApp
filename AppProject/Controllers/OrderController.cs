using Domain.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
       
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = await _orderService.CreateOrderAsync(model);
            return Ok(order);
        }


        //[HttpPut("{id}")]
        //[Authorize(Roles = "Coordinator")] // Shto autorizimin këtu
        //public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] OrderModel model)
        //{
        //    if (id != model.OrderId) return BadRequest();
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    // Thirrni funksionin e përditësimit në shërbim
        //    var result = await _orderService.UpdateOrder(model);

        //    return Ok(result);
        //}

        [HttpPut("{id}")]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] OrderModel model)
        {
            // ...
            // Thirrni funksionin e përditësimit në shërbim
            var result = await _orderService.UpdateOrderAsync(model); // Shtohet Async

            return Ok(result);
        }
       


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null) return NotFound();

            return Ok(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }
    }
}
