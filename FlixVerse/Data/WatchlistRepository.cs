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

    public List<WatchlistItem> GetInProgressWatchlistItemsByPageAndStatus(int page, WatchlistItemStatus status, long userId)
    {
        return FlixverseDbContext.WatchlistItems
            .Where(item => item.UserId == userId)
            .Where(item => item.Status == status)
            .Skip(page * PageMultiplier)
            .Take(PageMultiplier)
            .ToList();
    }

    public List<WatchlistItem> GetCompletedWatchlistItemsByPage(int page, long userId)
    {
        return FlixverseDbContext.WatchlistItems
            .Where(item => item.UserId == userId)
            .Where(item => item.Status == WatchlistItemStatus.Completed)
            .Skip(page * PageMultiplier)
            .Take(PageMultiplier)
            .ToList();
    }

    public bool CompleteEntryById(long entryId)
    {
        var itemById = FlixverseDbContext.WatchlistItems
            .FirstOrDefault(item => item.Id == entryId && item.Status == WatchlistItemStatus.Waiting);
        if (itemById == null)
        {
            return false;
        }
        itemById.Status = WatchlistItemStatus.Completed;
        FlixverseDbContext.SaveChanges();
        return true;
    }

    public bool RemoveEntryById(long entryId)
    {
        var itemById = FlixverseDbContext.WatchlistItems
            .FirstOrDefault(item => item.Id == entryId);
        if (itemById == null)
        {
            return false;
        }

        FlixverseDbContext.Remove(itemById);
        FlixverseDbContext.SaveChanges();
        return true;
    }

    public bool SetToWatchingById(long entryId)
    {
        var itemById = FlixverseDbContext.WatchlistItems
            .FirstOrDefault(item => item.Id == entryId && item.Status == WatchlistItemStatus.Completed);
        if (itemById == null)
        {
            return false;
        }
        itemById.Status = WatchlistItemStatus.Waiting;
        FlixverseDbContext.SaveChanges();
        return true;
    }
}
