using BCrypt.Net;
using FlixVerse.Data;
using FlixVerse.Models;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers.Security;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly JwtService _jwtService;
    private UserRepository _userRepository;

    public AuthenticationController(JwtService jwtService, UserRepository userRepository)
    {
        _jwtService = jwtService;
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public IActionResult Register(UserRequest request)
    {
        bool existsUsername = _userRepository.GetByCondition(User => User.Username == request.Username).Any();
        bool existsEmail = _userRepository.GetByCondition(User => User.Email == request.Email).Any();

        if (existsEmail || existsUsername)
        {
            return Conflict();
        }

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        _userRepository.Create(new User(request.Username, passwordHash, request.Email));

        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(UserRequest request)
    {
        User user = _userRepository.GetByCondition(User => User.Username == request.Username).FirstOrDefault();

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHashed))
        {
            return BadRequest("Login details don't match.");
        }

        string jwtToken = _jwtService.GenerateJwtToken(user);
        return Ok(jwtToken);
    }
}