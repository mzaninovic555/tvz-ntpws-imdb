using Microsoft.Extensions.Options;

namespace FlixVerse.Configuration;

public class TmdbProperties
{
    public static readonly string prefix = "TMDB";
    public string ApiKey { get; set; }
}
