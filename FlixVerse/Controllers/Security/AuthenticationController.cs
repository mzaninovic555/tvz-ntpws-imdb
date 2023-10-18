using BCrypt.Net;
using FlixVerse.Models;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers.Security;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthenticationController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register(UserRequest request)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(UserRequest request)
    {
        User user = new User(request.Username, BCrypt.Net.BCrypt.HashPassword(request.Password)); // TODO hvatati iz baze
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHashed))
        {
            return BadRequest("Login details don't match.");
        }

        string jwtToken = _jwtService.GenerateJwtToken(user);
        return Ok(jwtToken);
    }
}