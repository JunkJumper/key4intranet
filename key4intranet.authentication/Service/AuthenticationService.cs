using key4intranet.authentication.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace key4intranet.authentication.Service
{
    public interface IAuthenticationService
    {
        StoredUserModel Authenticate(PostUserModel login);
        string GetToken(StoredUserModel user);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILogger<AuthenticationService> _logger;
        private readonly List<StoredUserModel> _users;

        public AuthenticationService(ILogger<AuthenticationService> logger, IConfiguration configuration)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _users = configuration.GetSection("Authentication:Entities").Get<List<StoredUserModel>>() ?? throw new ArgumentNullException("ConfigUserList");
        }

        public StoredUserModel Authenticate(PostUserModel login)
        {
            var user = _users.Find(u => u.Mail == login.User);
            if (user != null && CheckPassword(login, user))
            {
                return user;
            }
            return null;
        }

        public string GetToken(StoredUserModel user)
        {
            _ = user ?? throw new ArgumentNullException(nameof(user));
            var provider = new TokenProviderService().GetTokenProvider(TokenProviderService.TokenType.JWT);
            return provider.CreateToken(new Dictionary<string, object>() { { "ID", user.Mail }, { "Roles", user.Roles } });

        }

        private bool CheckPassword(PostUserModel submitUser, StoredUserModel storedUser)
        {
            return (new PasswordHasher<string>()).VerifyHashedPassword(null, storedUser.Pass, submitUser.Pass) == PasswordVerificationResult.Success;
        }
    }
}
