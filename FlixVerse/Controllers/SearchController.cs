using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Controllers.Series;
using FlixVerse.Models.Article;
using FlixVerse.Models.Item;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.Trending;

namespace FlixVerse.Controllers;

[ApiController]
public class SearchController : ControllerBase
{
    private readonly TMDbClient _client;
    public SearchController(IOptions<TmdbProperties> props)
    {
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("/movies")]
    public async Task<IActionResult> GetMoviesSearch([FromQuery]SearchModel query)
    {
        var fetchedMovies = await _client.GetTrendingMoviesAsync(TimeWindow.Week, query.Page);
        var showResults = fetchedMovies.Results
            .Select(res => new GenericItemResponse(
                res.Id,
                res.Title,
                TmdbUtils.GetImageUrl(res.PosterPath),
                ItemType.Movie))
            .ToList();

        return Ok(showResults);
    }

    [HttpGet("/shows")]
    public async Task<IActionResult> GetShowSearch([FromQuery]SearchModel query)
    {
        var fetchedSeries = await _client.GetTrendingTvAsync(TimeWindow.Week, query.Page);
        var showResults = fetchedSeries.Results
            .Select(res => new GenericItemResponse(
                res.Id,
                res.Name,
                TmdbUtils.GetImageUrl(res.PosterPath),
                ItemType.Movie))
            .ToList();

        return Ok(showResults);
    }
}
