using System.ComponentModel.DataAnnotations;

namespace FlixVerse.Models.User;

public class LoginRequest
{
    [Required]
    public string UsernameOrEmail { get; set; }
    [Required]
    public string Password { get; set; }
}
