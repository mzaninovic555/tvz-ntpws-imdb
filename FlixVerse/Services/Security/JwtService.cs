using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FlixVerse.Configuration;
using FlixVerse.Data;
using FlixVerse.Models.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FlixVerse.Services.Security;

public class JwtService
{
    private readonly JwtConfiguration _options;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserRepository _userRepository;

    public JwtService(IOptions<JwtConfiguration> options, IHttpContextAccessor httpContextAccessor, UserRepository userRepository)
    {
        _httpContextAccessor = httpContextAccessor;
        _userRepository = userRepository;
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

    public User? GetUsernameFromContext()
    {
        string? username = _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim => claim.Type == "name")?.Value;
        return username.IsNullOrEmpty()
            ? null
            : _userRepository.GetByCondition(user => user.Username == username).FirstOrDefault();
    }
}
