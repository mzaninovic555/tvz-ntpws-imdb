using FlixVerse.Data;
using FlixVerse.Models.Common;
using FlixVerse.Models.Watchlist;
using FlixVerse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers;

[ApiController]
[Route("watchlist")]
[Authorize]
public class WatchlistController : ControllerBase
{
    private readonly WatchlistRepository _watchlistRepository;
    private readonly WatchlistService _watchlistService;

    public WatchlistController(WatchlistRepository watchlistRepository, WatchlistService watchlistService)
    {
        _watchlistRepository = watchlistRepository;
        _watchlistService = watchlistService;
    }

    [HttpGet]
    public IActionResult GetWatchlistItemsInProgress(int page)
    {
        var res = _watchlistService.GetItemsForWatchlistByStatusAndPage(page, WatchlistItemStatus.Waiting);
        return Ok(res);
    }

    [HttpGet("completed")]
    public IActionResult GetWatchlistItemsCompleted(int page)
    {
        var res = _watchlistService.GetItemsForWatchlistByStatusAndPage(page, WatchlistItemStatus.Completed);
        return Ok(res);
    }

    [HttpPost("set-complete")]
    public IActionResult CompleteEntry(WatchlistRequest request)
    {
        return _watchlistRepository.CompleteEntryById(request.ItemId)
            ? Ok(new BasicResponse("Item set to completed"))
            : BadRequest(new BasicResponse("Item wasn't found in watchlist"));
    }

    [HttpPost("remove")]
    public IActionResult RemoveEntry(WatchlistRequest request)
    {
        return _watchlistRepository.RemoveEntryById(request.ItemId)
            ? Ok(new BasicResponse("Item removed from watchlist"))
            : BadRequest(new BasicResponse("Item wasn't found in watchlist"));
    }

    [HttpPost("set-watching")]
    public IActionResult SetWatching(WatchlistRequest request)
    {
        return _watchlistRepository.SetToWatchingById(request.ItemId)
            ? Ok(new BasicResponse("Item set to in progress"))
            : BadRequest(new BasicResponse("Item wasn't found in watchlist"));
    }
}
