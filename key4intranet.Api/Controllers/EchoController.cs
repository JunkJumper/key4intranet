using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace key4intranet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/echo")]
    public class EchoController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetEcho()
        {
            return Ok($"echo { GetProjectName() }");
        }

        [HttpGet("authorized")]
        public IActionResult GetAuthorizedEcho()
        {
            return Ok($"authorized echo { GetProjectName() }");
        }

        private string GetProjectName() => this.GetType().Namespace.Split('.')[0];
    }
}
