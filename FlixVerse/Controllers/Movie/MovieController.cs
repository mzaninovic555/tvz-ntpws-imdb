using FlixVerse.Configuration;
using FlixVerse.Models.Common;
using FlixVerse.Models.Movies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;

namespace FlixVerse.Controllers.Movie;

[ApiController]
public class MovieController : ControllerBase
{
    private readonly TMDbClient _client;
    public MovieController(IOptions<TmdbProperties> props)
    {
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("movie/{id?}")]
    public async Task<IActionResult> GetMovieDetails(string? id)
    {
        var fetchedMovie = await _client.GetMovieAsync(id,
            MovieMethods.WatchProviders | MovieMethods.Recommendations);

        if (fetchedMovie == null)
        {
            return NotFound(new BasicResponse("The requested movie wasn't found."));
        }

        var movieResponse = new MovieDetailsResponse(
            fetchedMovie.Id,
            fetchedMovie.Title,
            fetchedMovie.Adult,
            fetchedMovie.Genres,
            fetchedMovie.Overview,
            fetchedMovie.ReleaseDate.Value,
            fetchedMovie.Runtime.GetValueOrDefault(-1),
            fetchedMovie.Status,
            fetchedMovie.WatchProviders.Results.Single(p => p.Key == "US").Value.FlatRate, // TODO: get locale from browser
            fetchedMovie.BackdropPath,
            fetchedMovie.PosterPath
        );

        return Ok(movieResponse);
    }
}
