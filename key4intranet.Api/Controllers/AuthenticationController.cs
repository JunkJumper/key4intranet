using key4intranet.authentication.Models;
using key4intranet.authentication.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace key4intranet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(ILogger<AuthenticationController> logger, IAuthenticationService authenticationService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody] PostUserModel model)
        {
            if (model == null) { return Unauthorized(); }
            if (string.IsNullOrWhiteSpace(model.User)) { return Unauthorized(); }
            if (string.IsNullOrWhiteSpace(model.Pass)) { return Unauthorized(); }
          
            var user = _authenticationService.Authenticate(model);
            if (user == null) { return Unauthorized(); }

            var returnUser = new ExposedUserModel
            {
                Id = user.Id,
                Name = user.Name,
                Roles = user.Roles,
            };

            var token = _authenticationService.GetToken(user);
            if (string.IsNullOrWhiteSpace(token)) { return Unauthorized(); }

            returnUser.Token = token;
            return Ok(returnUser);
        }

        [HttpPost("encrypt")]
        public string EncryptPhrase([FromBody] string phrase)
        {
            if (string.IsNullOrWhiteSpace(phrase)) { throw new ArgumentNullException(nameof(phrase)); }

            return (new PasswordHasher<string>()).HashPassword(null, phrase);
        }
    }
}
