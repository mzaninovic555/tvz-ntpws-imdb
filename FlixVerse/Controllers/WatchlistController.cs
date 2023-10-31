using FlixVerse.Configuration;
using FlixVerse.Data;
using FlixVerse.Models.Article;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;

namespace FlixVerse.Controllers;

[ApiController]
[Route("watchlist")]
[Authorize]
public class WatchlistController : ControllerBase
{
    private readonly WatchlistRepository _watchlistRepository;
    private readonly TMDbClient _client;
    private readonly JwtService _jwtService;

    public WatchlistController(IOptions<TmdbProperties> props, WatchlistRepository watchlistRepository, JwtService jwtService)
    {
        _watchlistRepository = watchlistRepository;
        _jwtService = jwtService;
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet]
    public IActionResult GetWatchlistItems(int page)
    {
        var user = _jwtService.GetUsernameFromContext();
        var watchlistItems = _watchlistRepository.GetWatchlistItemsByPage(page, user!.Id);

        var res = watchlistItems
            .Where(item => item.Type == ItemType.Show)
            .Select(async item => await _client.GetTvShowAsync((int)item.ItemId))
            .Select(item => new UserWatchlistResponse(
                item.Result.Name,
                item.Result.PosterPath,
                new WatchlistItem(
                    item.Result.Id,
                    ItemType.Show,
                    user!.Id,
                    watchlistItems.First(wi => wi.ItemId == item.Result.Id).Status
                )
            )).ToList();

        var movies = watchlistItems
            .Where(watchlistItem => watchlistItem.Type == ItemType.Movie)
            .Select(async watchlistItem => await _client.GetMovieAsync((int)watchlistItem.ItemId))
            .Select(movie => new UserWatchlistResponse(
                movie.Result.Title,
                movie.Result.PosterPath,
                new WatchlistItem(
                    movie.Result.Id,
                    ItemType.Show,
                    user!.Id,
                    watchlistItems.First(wi => wi.ItemId == movie.Result.Id).Status
                )
            )).ToList();

        res.AddRange(movies);
        return Ok(res);
    }
}
