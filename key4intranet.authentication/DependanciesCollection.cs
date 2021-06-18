using key4intranet.authentication.Providers.Jwt;
using key4intranet.authentication.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;

namespace key4intranet.authentication
{
    public static class DependanciesCollection
    {
        public static IServiceCollection AddAuthenticationServicesCollection(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            // Configure Authentication
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            // Configure JWT
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(JwtTokenProvider.SignatureKey),
                    ValidateIssuer = true,
                    ValidIssuer = JwtTokenProvider.Issuer,
                    ValidateAudience = false
                };
            });

            return services;
        }
    }
}
