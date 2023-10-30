using FlixVerse.Data.Base;
using FlixVerse.Data.Context;
using FlixVerse.Models.Article;
using FlixVerse.Models.User;
using FlixVerse.Models.Watchlist;

namespace FlixVerse.Data;

public class WatchlistRepository : BaseRepository<WatchlistItem>
{
    public WatchlistRepository(FlixverseDbContext flixverseDbContext) : base(flixverseDbContext)
    {
    }

    public bool IsAddedToWatchlist(User user, long itemId, ItemType type)
    {
        return FlixverseDbContext.WatchlistItems
            .Any(item => item.User == user && item.ItemId == itemId && item.Type == type);
    }
}
