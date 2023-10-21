using FlixVerse.Models;
using FlixVerse.Models.User;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Data.Context;

public class FlixverseDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public FlixverseDbContext(DbContextOptions options) : base(options)
    {
    }
}
