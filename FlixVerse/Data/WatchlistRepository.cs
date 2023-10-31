using FlixVerse.Data.Base;
using FlixVerse.Data.Context;
using FlixVerse.Models.Article;
using FlixVerse.Models.User;
using FlixVerse.Models.Watchlist;

namespace FlixVerse.Data;

public class WatchlistRepository : BaseRepository<WatchlistItem>
{
    private const int PageMultiplier = 5;

    public WatchlistRepository(FlixverseDbContext flixverseDbContext) : base(flixverseDbContext)
    {
    }

    public bool IsAddedToWatchlist(User user, long itemId, ItemType type)
    {
        return FlixverseDbContext.WatchlistItems
            .Any(item => item.User == user && item.ItemId == itemId && item.Type == type);
    }

    public List<WatchlistItem> GetWatchlistItemsByPage(int page, long userId)
    {
        return FlixverseDbContext.WatchlistItems
            .Where(item => item.UserId == userId)
            .Skip(page * PageMultiplier)
            .Take(PageMultiplier)
            .ToList();
    }
}
