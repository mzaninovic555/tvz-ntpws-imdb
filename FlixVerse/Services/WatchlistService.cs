using FlixVerse.Configuration;
using FlixVerse.Data;
using FlixVerse.Models.Article;
using FlixVerse.Models.User;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;

namespace FlixVerse.Services;

public class WatchlistService
{
    private readonly JwtService _jwtService;
    private readonly WatchlistRepository _watchlistRepository;
    private readonly TMDbClient _client;

    public WatchlistService(IOptions<TmdbProperties> props, JwtService jwtService, WatchlistRepository watchlistRepository)
    {
        _jwtService = jwtService;
        _watchlistRepository = watchlistRepository;
        _client = new TMDbClient(props.Value.ApiKey);
    }

    public List<UserWatchlistResponse> GetItemsForWatchlistByStatusAndPage(int page, WatchlistItemStatus status)
    {
        var user = _jwtService.GetUsernameFromContext();
        var watchlistItems = _watchlistRepository.GetInProgressWatchlistItemsByPageAndStatus(page, status, user!.Id);

        var res = watchlistItems
            .Where(item => item.Type == ItemType.Show)
            .Select(async item => await _client.GetTvShowAsync((int)item.ItemId))
            .Select(item =>
            {
                var watchlistItem = watchlistItems.First(wi => wi.ItemId == item.Result.Id);
                return new UserWatchlistResponse(
                    item.Result.Name,
                    item.Result.PosterPath,
                    new WatchlistItem(
                        watchlistItem.Id,
                        item.Result.Id,
                        ItemType.Show,
                        user!.Id,
                        watchlistItem.Status
                    ));
            }).ToList();

        var movies = watchlistItems
            .Where(watchlistItem => watchlistItem.Type == ItemType.Movie)
            .Select(async watchlistItem => await _client.GetMovieAsync((int)watchlistItem.ItemId))
            .Select(item => {
                var watchlistItem = watchlistItems.First(wi => wi.ItemId == item.Result.Id);
                return new UserWatchlistResponse(
                    item.Result.Title,
                    item.Result.PosterPath,
                    new WatchlistItem(
                        watchlistItem.Id,
                        item.Result.Id,
                        ItemType.Show,
                        user!.Id,
                        watchlistItem.Status
                    ));
            }).ToList();

        res.AddRange(movies);
        return res;
    }

    public bool IsItemInWatchlist(long itemId, ItemType type)
    {
        User? user = _jwtService.GetUsernameFromContext();
        if (user == null)
        {
            return false;
        }

        return _watchlistRepository.IsAddedToWatchlist(user, itemId, type);
    }

    public WatchlistResultType AddItemToWatchlist(long itemId, ItemType type)
    {
        User? user = _jwtService.GetUsernameFromContext();
        if (user == null)
        {
            return WatchlistResultType.NonExistingUser;
        }

        var isInWatchlist = _watchlistRepository.IsAddedToWatchlist(user, itemId, type);
        if (isInWatchlist)
        {
            return WatchlistResultType.AlreadyInWatchlist;
        }
        _watchlistRepository.Create(new WatchlistItem(itemId, type, user.Id, WatchlistItemStatus.Waiting));

        return WatchlistResultType.Added;
    }
}
