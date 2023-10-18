using FlixVerse.Models;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Services.Database;

public class FlixverseDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public FlixverseDbContext(DbContextOptions options) : base(options)
    {
    }
}