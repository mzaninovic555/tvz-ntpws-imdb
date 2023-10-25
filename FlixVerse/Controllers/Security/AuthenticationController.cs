using FlixVerse.Data;
using FlixVerse.Models.Common;
using FlixVerse.Models.User;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers.Security;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly JwtService _jwtService;
    private readonly UserRepository _userRepository;

    public AuthenticationController(JwtService jwtService, UserRepository userRepository)
    {
        _jwtService = jwtService;
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        bool existsUsername = _userRepository.GetByCondition(User => User.Username == request.Username).Any();
        if (existsUsername)
        {
            return Conflict(new BasicResponse{ Message = "Username is already in use" });
        }

        bool existsEmail = _userRepository.GetByCondition(User => User.Email == request.Email).Any();
        if (existsEmail)
        {
            return Conflict(new BasicResponse{ Message = "E-mail is already in use." });
        }

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        _userRepository.Create(new User(request.Username, passwordHash, request.Email));

        return Ok(new BasicResponse{ Message = "Registered successfully" });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        User user = _userRepository.GetByCondition(User =>
            User.Username == request.UsernameOrEmail || User.Email == request.UsernameOrEmail).FirstOrDefault();
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHashed))
        {
            return BadRequest(new LoginResponse { Message = "Login details don't match." });
        }

        string jwtToken = _jwtService.GenerateJwtToken(user);
        var response = new LoginResponse
        {
            Token = jwtToken
        };
        return Ok(response);
    }
}
