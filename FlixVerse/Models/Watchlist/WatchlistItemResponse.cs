namespace FlixVerse.Models.Watchlist;

public class WatchlistItemResponse
{
    public long Id { get; set; }

    public long ItemId { get; set; }

    public String Type { get; set; }

    public WatchlistItemStatus Status { get; set; }
    public long UserId { get; set; }

    public WatchlistItemResponse(long id, long itemId, string type, WatchlistItemStatus status, long userId)
    {
        Id = id;
        ItemId = itemId;
        Type = type;
        Status = status;
        UserId = userId;
    }
}
