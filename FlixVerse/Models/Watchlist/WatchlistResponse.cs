namespace FlixVerse.Models.Watchlist;

public class WatchlistResponse
{
    public string Message { get; set; }
    public bool IsAdded { get; set; }

    public WatchlistResponse(string message, bool isAdded)
    {
        Message = message;
        IsAdded = isAdded;
    }
}
