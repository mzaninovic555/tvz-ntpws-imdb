using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Common;
using FlixVerse.Models.Series;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.TvShows;

namespace FlixVerse.Controllers.Series;

[ApiController]
public class SeriesController : ControllerBase
{
    private readonly TMDbClient _client;
    public SeriesController(IOptions<TmdbProperties> props)
    {
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("series/{id?}")]
    public async Task<IActionResult> GetSeriesDetails(string? id)
    {
        var fetchedSeries = await _client.GetTvShowAsync(int.Parse(id),
            TvShowMethods.WatchProviders
            | TvShowMethods.Recommendations
            | TvShowMethods.Credits);


        if (fetchedSeries == null)
        {
            return NotFound(new BasicResponse("The requested movie wasn't found."));
        }

        var showResponse = new SeriesDetailsResponse(
            fetchedSeries.Id,
            fetchedSeries.Name,
            fetchedSeries.Genres,
            fetchedSeries.Overview,
            fetchedSeries.Status,
            fetchedSeries.BackdropPath,
            fetchedSeries.PosterPath,
            TmdbUtils.GetCertificationFromSeries(fetchedSeries),
            fetchedSeries.Tagline,
            TmdbUtils.GetCrewFromSeries(fetchedSeries),
            fetchedSeries.FirstAirDate,
            fetchedSeries.LastAirDate,
            TmdbUtils.GetWatchProvidersFromSeries(fetchedSeries),
            TmdbUtils.GetTopCastFromSeries(fetchedSeries),
            fetchedSeries.NumberOfSeasons
        );

        return Ok(showResponse);
    }
}
