using Microsoft.Extensions.Options;

namespace FlixVerse.Configuration;

public class JwtConfiguration
{
    public static readonly string prefix = "JwtConfiguration";

    public string Secret { get; set; }
}