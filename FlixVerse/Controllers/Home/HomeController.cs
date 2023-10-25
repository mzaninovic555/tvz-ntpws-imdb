using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Movies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;

namespace FlixVerse.Controllers.Home;

[ApiController]
public class HomeController : ControllerBase
{
    private readonly TmdbProperties _props;
    private readonly TMDbClient _client;
    public HomeController(IOptions<TmdbProperties> props)
    {
        _props = props.Value;
        _client = new TMDbClient(_props.ApiKey);
    }

    [HttpGet("/api/popular-movies")]
    public async Task<IActionResult> GetPopularMovies()
    {
        var popularMoviesAsync = await _client.GetMoviePopularListAsync("en-US", 1);

        var movieResults = popularMoviesAsync.Results
            .Select(res =>
                new MoviePopularResponse(res.Id, res.Title, TmdbUtils.GetImageUrl(res.BackdropPath)))
            .Take(18)
            .ToList();

        return Ok(movieResults);
    }
}
