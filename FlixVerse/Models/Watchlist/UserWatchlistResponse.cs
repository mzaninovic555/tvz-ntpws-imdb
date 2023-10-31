namespace FlixVerse.Models.Watchlist;

public class UserWatchlistResponse
{
    public string Title { get; set; }
    public string? PosterPath { get; set; }
    public WatchlistItem WatchlistItem { get; set; }

    public UserWatchlistResponse(string title, string? posterPath, WatchlistItem watchlistItem)
    {
        Title = title;
        WatchlistItem = watchlistItem;
        PosterPath = posterPath;
    }
}
