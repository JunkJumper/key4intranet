using System;
using System.Collections.Generic;
using System.Text;

namespace key4intranet.authentication.Providers
{
    public interface ITokenProvider
    {
        /// <summary>
        /// Create a token with list of private claim
        /// </summary>
        /// <param name="claims">claims</param>
        /// <returns>encrypt token</returns>
        string CreateToken(IDictionary<string, object> claims);
        /// <summary>
        /// Create a token with list claims, there be public or private
        /// </summary>
        /// <param name="privateClaims">Private claims</param>
        /// <param name="publicClaims">Public claims</param>
        /// <returns>Encrypt token</returns>
        string CreateToken(IDictionary<string, object> privateClaims, IDictionary<string, object> publicClaims);
        /// <summary>
        /// Get claims from token
        /// </summary>
        /// <param name="token">token</param>
        /// <returns>List of claims</returns>
        IDictionary<string, object> ReadClaims(string token);
        /// <summary>
        /// Is token valide
        /// </summary>
        /// <param name="token">token</param>
        /// <returns>true is token is valid</returns>
        Boolean ValidateToken(string token);
    }
}
