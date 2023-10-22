﻿using System.ComponentModel.DataAnnotations;

namespace FlixVerse.Models.User;

public class RegisterRequest
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Email { get; set; }

}
