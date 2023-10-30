using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Article;
using FlixVerse.Models.Common;
using FlixVerse.Models.Movies;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.Movies;

namespace FlixVerse.Controllers.Movie;

[ApiController]
public class MovieController : ControllerBase
{
    private readonly TMDbClient _client;
    private readonly WatchlistService _watchlistService;
    public MovieController(IOptions<TmdbProperties> props, WatchlistService watchlistService)
    {
        _watchlistService = watchlistService;
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("movie/{id?}")]
    public async Task<IActionResult> GetMovieDetails(string? id)
    {
        var fetchedMovie = await _client.GetMovieAsync(id,
            MovieMethods.WatchProviders
            | MovieMethods.Recommendations
            | MovieMethods.ReleaseDates
            | MovieMethods.Credits);

        if (fetchedMovie == null)
        {
            return NotFound(new BasicResponse("The requested movie wasn't found."));
        }

        var movieResponse = new MovieDetailsResponse(
            fetchedMovie.Id,
            fetchedMovie.Title,
            fetchedMovie.Genres,
            fetchedMovie.Overview,
            fetchedMovie.Status,
            fetchedMovie.BackdropPath,
            fetchedMovie.PosterPath,
            TmdbUtils.GetCertificationFromMovie(fetchedMovie),
            fetchedMovie.Tagline,
            TmdbUtils.GetCrewFromMovie(fetchedMovie),
            fetchedMovie.ReleaseDate.Value,
            fetchedMovie.Runtime.GetValueOrDefault(-1),
            TmdbUtils.GetWatchProvidersFromMovie(fetchedMovie),
            TmdbUtils.GetTopCastFromMovie(fetchedMovie),
            _watchlistService.IsItemInWatchlist(fetchedMovie.Id, ItemType.Movie)
        );

        return Ok(movieResponse);
    }

    [Authorize]
    [HttpPost("movie/add-to-watchlist")]
    public IActionResult AddMovieToWatchlist(WatchlistRequest request)
    {
        bool isItemInWatchlist = _watchlistService.IsItemInWatchlist(request.MovieId, ItemType.Movie);
        if (isItemInWatchlist)
        {
            return BadRequest("Item is already in watchlist");
        }

        bool isAdded = _watchlistService.AddItemToWatchlist(request.MovieId, ItemType.Movie);
        return isAdded ? Ok("Successfully added to watchlist") : Unauthorized("User isn't logged in");
    }
}
