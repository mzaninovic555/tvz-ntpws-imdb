using FlixVerse.Models.User;
using FlixVerse.Models.Watchlist;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Data.Context;

public class FlixverseDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<WatchlistItem> WatchlistItems { get; set; }

    public FlixverseDbContext(DbContextOptions options) : base(options)
    {
    }
}
