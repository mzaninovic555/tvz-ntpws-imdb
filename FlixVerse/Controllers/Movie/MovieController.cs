using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Common;
using FlixVerse.Models.Movies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
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
            TmdbUtils.GetTopCastFromMovie(fetchedMovie)
        );

        return Ok(movieResponse);
    }
}
