using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Models.User;

[Table("Users")]
[Index(nameof(Username), nameof(Email), IsUnique = true)]
public class User
{
    [Key]
    public long Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string PasswordHashed { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    public User(string username, string passwordHashed, string email)
    {
        Username = username;
        PasswordHashed = passwordHashed;
        Email = email;
    }
}
