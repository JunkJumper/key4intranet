using key4intranet.authentication.Providers;
using key4intranet.authentication.Providers.Jwt;
using System;
using System.Collections.Generic;
using System.Text;

namespace key4intranet.authentication.Service
{
    public class TokenProviderService
    {
        public enum TokenType
        {
            JWT
        }

        public ITokenProvider GetTokenProvider(TokenType type)
        {
            return type switch
            {
                TokenType.JWT => (ITokenProvider)new JwtTokenProvider(),
                _ => null,
            };
        }
    }
}
