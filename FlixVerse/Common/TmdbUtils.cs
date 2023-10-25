namespace FlixVerse.Common;

public class TmdbUtils
{
    public const string BackdropPrefix = "https://image.tmdb.org/t/p/original/";

    public static string GetImageUrl(string path)
    {
        return BackdropPrefix + path;
    }
}
