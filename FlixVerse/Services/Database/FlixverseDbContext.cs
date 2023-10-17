using FlixVerse.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Services.Database;

public class FlixverseDbContext : IdentityDbContext
{
    public FlixverseDbContext(DbContextOptions options) : base(options)
    {
    }
}