using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace key4intranet.authentication.Providers.Jwt
{
    public class JwtTokenProvider : ITokenProvider
    {
        public static byte[] SignatureKey { get; } = Encoding.ASCII.GetBytes(Guid.NewGuid().ToString());
        public static string Issuer { get; set; } = "https://api.key4intranet.key4events.com";

        /// <summary>
        /// Create a JWT with private and public claims
        /// </summary>
        /// <param name="privateClaims">private claims</param>
        /// <param name="publicClaims">public claims</param>
        /// <returns>token</returns>
        public string CreateToken(IDictionary<string, object> privateClaims, IDictionary<string, object> publicClaims)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Create a JWT with list of private claim
        /// </summary>
        /// <param name="claims">claims</param>
        /// <returns>encrypt token</returns>
        public string CreateToken(IDictionary<string, object> claims)
        {
            //private claims can't not be empty
            if (claims == null || claims.Count == 0)
                throw new IOException($"private claims can't be null or empty.");

            var tokenDescriptor = (new SecurityTokenDescriptor()
            {
                Issuer = Issuer,
                Expires = DateTime.UtcNow.AddMinutes(120),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(SignatureKey), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity()
            });

            // Registrered claims
            foreach (var item in claims)
            {
                // identifier
                if (new List<string>() { "name", "id" }.Contains(item.Key.ToLower())) tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Name, item.Value.ToString()));
                // roles
                else if (new List<string>() { "role", "roles" }.Contains(item.Key.ToLower()))
                    if (item.Value is IEnumerable<string> roles)
                        foreach (string role in roles)
                            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
                    else
                        tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, item.Value.ToString()));
                // issuer
                else if (new List<string>() { "iss", "issuer" }.Contains(item.Key.ToLower())) tokenDescriptor.Issuer = item.Value.ToString();
                //audience
                else if (new List<string>() { "aud", "audience" }.Contains(item.Key.ToLower())) tokenDescriptor.Audience = item.Value.ToString();

            }


            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }

        /// <summary>
        /// Get claims from token
        /// </summary>
        /// <param name="token">token</param>
        /// <returns>List of claims</returns>
        public IDictionary<string, object> ReadClaims(string token)
        {
            if (token == null)
                throw new ArgumentNullException("Token is null.");

            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
                throw new ArgumentException("Can't read token.");

            var jwtToken = handler.ReadJwtToken(token);
            return (IDictionary<string, object>)jwtToken.Claims.ToDictionary(c => c.Type, c => (object)c.Value);
        }

        /// <summary>
        /// For JWT => Bearer extention will validate token
        /// </summary>
        /// <param name="token">jwt token</param>
        /// <returns>true if valid</returns>
        public bool ValidateToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}
