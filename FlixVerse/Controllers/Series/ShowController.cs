﻿using FlixVerse.Common;
using FlixVerse.Configuration;
using FlixVerse.Models.Article;
using FlixVerse.Models.Common;
using FlixVerse.Models.Series;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;
using TMDbLib.Objects.TvShows;

namespace FlixVerse.Controllers.Series;

[ApiController]
public class ShowController : ControllerBase
{
    private readonly TMDbClient _client;
    private readonly WatchlistService _watchlistService;
    public ShowController(IOptions<TmdbProperties> props, WatchlistService watchlistService)
    {
        _watchlistService = watchlistService;
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
            return NotFound(new BasicResponse("The requested show wasn't found."));
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
            fetchedSeries.NumberOfSeasons,
            _watchlistService.IsItemInWatchlist(fetchedSeries.Id, ItemType.Show)
        );

        return Ok(showResponse);
    }

    [Authorize]
    [HttpPost("show/add-to-watchlist")]
    public IActionResult AddMovieToWatchlist(WatchlistRequest request)
    {
        var res = _watchlistService.AddItemToWatchlist(request.ItemId, ItemType.Show);

        return res switch
        {
            WatchlistResultType.Added => Ok(new BasicResponse("Successfully added to watchlist")),
            WatchlistResultType.AlreadyInWatchlist => Conflict(new BasicResponse("Movie is already in your watchlist")),
            WatchlistResultType.NonExistingUser => BadRequest(new BasicResponse("The requested user doesn't exist")),
            _ => throw new MissingMethodException()
        };
    }
}
