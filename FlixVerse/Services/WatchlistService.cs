using FlixVerse.Data;
using FlixVerse.Models.Article;
using FlixVerse.Models.User;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Services;

public class WatchlistService
{
    private readonly JwtService _jwtService;
    private readonly WatchlistRepository _watchlistRepository;

    public WatchlistService(JwtService jwtService, WatchlistRepository watchlistRepository)
    {
        _jwtService = jwtService;
        _watchlistRepository = watchlistRepository;
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
