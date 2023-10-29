using FlixVerse.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TMDbLib.Client;

namespace FlixVerse.Controllers.Common;

[ApiController]
public class CommonController : ControllerBase
{
    private readonly TMDbClient _client;
    public CommonController(IOptions<TmdbProperties> props)
    {
        _client = new TMDbClient(props.Value.ApiKey);
    }

    [HttpGet("/api/genres/movie")]
    public async Task<IActionResult> GetGenresMovie()
    {
        var genres = await _client.GetMovieGenresAsync();
        return Ok(genres);
    }

    [HttpGet("/api/genres/show")]
    public async Task<IActionResult> GetGenresShow()
    {
        var genres = await _client.GetTvGenresAsync();
        return Ok(genres);
    }
}
