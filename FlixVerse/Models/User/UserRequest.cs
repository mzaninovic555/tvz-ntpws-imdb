using System.ComponentModel.DataAnnotations;

namespace FlixVerse.Models;

public class UserRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    [EmailAddress]
    public string Email { get; set; }
}