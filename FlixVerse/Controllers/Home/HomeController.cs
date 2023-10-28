using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Article;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.Trending;

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
        var popularMoviesAsync = await _client.GetTrendingMoviesAsync(TimeWindow.Week);

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
        var popularShowsResult = await _client.GetTrendingTvAsync(TimeWindow.Week);

        var showResults = popularShowsResult.Results
            .OrderByDescending(res => res.Popularity)
            .Select(res => new GenericItemCarouselResponse(
                res.Id,
                res.Name,
                TmdbUtils.GetImageUrl(res.PosterPath),
                ItemType.Show))
            .Take(18)
            .ToList();

        return Ok(showResults);
    }

    [HttpGet("/api/popular-actors")]
    public async Task<IActionResult> GetPopularActors()
    {
        var popularMoviesAsync = await _client.GetTrendingPeopleAsync(TimeWindow.Week);

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
