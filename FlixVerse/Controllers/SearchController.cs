using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Controllers.Series;
using FlixVerse.Models.Article;
using FlixVerse.Models.Item;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TMDbLib.Client;
using TMDbLib.Objects.Discover;

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
        var searchQuery = _client.DiscoverMoviesAsync()
            .OrderBy(DiscoverMovieSortBy.PopularityDesc)
            .WhereLanguageIs("en-US");

        if (query.FromDate != null)
        {
            searchQuery = searchQuery.WhereReleaseDateIsAfter(query.FromDate.Value);
        }

        if (query.ToDate != null)
        {
            searchQuery = searchQuery.WhereReleaseDateIsBefore(query.ToDate.Value);
        }

        if (!query.Genre.IsNullOrEmpty())
        {
            searchQuery = searchQuery.IncludeWithAllOfGenre(query.Genre);
        }

        var fetchedMovies = await searchQuery.Query(query.Page);
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
        var searchQuery = _client.DiscoverTvShowsAsync()
            .OrderBy(DiscoverTvShowSortBy.PopularityDesc)
            .WhereLanguageIs("en-US");

        if (query.FromDate != null)
        {
            searchQuery = searchQuery.WhereAirDateIsAfter(query.FromDate.Value);
        }

        if (query.ToDate != null)
        {
            searchQuery = searchQuery.WhereAirDateIsBefore(query.ToDate.Value);
        }

        if (!query.Genre.IsNullOrEmpty())
        {
            searchQuery = searchQuery.WhereGenresInclude(query.Genre);
        }

        var fetchedSeries = await searchQuery.Query(query.Page);
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
