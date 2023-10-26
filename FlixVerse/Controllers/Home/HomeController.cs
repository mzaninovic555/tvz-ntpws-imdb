using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Article;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;

namespace FlixVerse.Controllers.Home;

[ApiController]
public class HomeController : ControllerBase
{
    private readonly TMDbClient _client;
    public HomeController(IOptions<TmdbProperties> props)
    {
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("/api/popular-movies")]
    public async Task<IActionResult> GetPopularMovies()
    {
        var popularMoviesAsync = await _client.GetMoviePopularListAsync("en-US", 1);

        var movieResults = popularMoviesAsync.Results
            .Select(res => new GenericItemCarouselResponse(
                res.Id,
                res.Title,
                TmdbUtils.GetImageUrl(res.PosterPath),
                ItemType.Movie))
            .Take(18)
            .ToList();

        return Ok(movieResults);
    }

    [HttpGet("/api/popular-shows")]
    public async Task<IActionResult> GetPopularShows()
    {
        var popularMoviesAsync = await _client.GetTvShowPopularAsync(1, "en-US");

        var movieResults = popularMoviesAsync.Results
            .Select(res => new GenericItemCarouselResponse(
                res.Id,
                res.Name,
                TmdbUtils.GetImageUrl(res.PosterPath),
                ItemType.Show))
            .Take(18)
            .ToList();

        return Ok(movieResults);
    }

    [HttpGet("/api/popular-actors")]
    public async Task<IActionResult> GetPopularActors()
    {
        var popularMoviesAsync = await _client.GetPersonPopularListAsync(1, "en-US");

        var movieResults = popularMoviesAsync.Results
            .Select(res => new GenericItemCarouselResponse(
                res.Id,
                res.Name,
                TmdbUtils.GetImageUrl(res.ProfilePath),
                ItemType.Person))
            .Take(18)
            .ToList();

        return Ok(movieResults);
    }
}
