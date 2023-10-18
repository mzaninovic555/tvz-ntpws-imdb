using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FlixVerse.Configuration;
using FlixVerse.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FlixVerse.Services.Security;

public class JwtService
{
    private readonly JwtConfiguration _options;

    public JwtService(IOptions<JwtConfiguration> options)
    {
        _options = options.Value;
    }

    public string GenerateJwtToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}