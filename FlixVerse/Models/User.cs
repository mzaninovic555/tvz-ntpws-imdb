namespace FlixVerse.Models;

public class User
{
    public long Id { get; set; }
    public string Username { get; set; }
    public string PasswordHashed { get; set; }
    public string Email { get; set; }

    public User(string username, string passwordHashed)
    {
        Username = username;
        PasswordHashed = passwordHashed;
    }
}