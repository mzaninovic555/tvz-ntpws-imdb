namespace FlixVerse.Common;

public class TmdbUtils
{
    public const string ImagePrefix = "https://image.tmdb.org/t/p/original/";

    public static string GetImageUrl(string path)
    {
        return ImagePrefix + path;
    }
}
