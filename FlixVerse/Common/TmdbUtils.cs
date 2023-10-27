using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;

namespace FlixVerse.Common;

public class TmdbUtils
{
    public const string ImagePrefix = "https://image.tmdb.org/t/p/original/";

    public static string GetImageUrl(string path)
    {
        return ImagePrefix + path;
    }

    public static string? GetCertificationFromMovie(Movie fetchedMovie)
    {
        if (fetchedMovie.ReleaseDates == null)
        {
            return null;
        }
        return fetchedMovie.ReleaseDates.Results.FirstOrDefault(result =>
                result.Iso_3166_1 == "US" && result.ReleaseDates
                    .Count(releaseDate => releaseDate.Certification != "") > 0
            )?.ReleaseDates.LastOrDefault(releaseDate => releaseDate.Certification != "")
            ?.Certification;
    }

    public static List<WatchProviderItem>? GetWatchProvidersFromMovie(Movie fetchedMovie)
    {
        return fetchedMovie.WatchProviders.Results
            .SingleOrDefault(p => p.Key == "US")
            .Value
            ?.FlatRate; // TODO: get locale from browser

    }

    public static List<Crew>? GetCrewFromMovie(Movie fetchedMovie)
    {
        return fetchedMovie.Credits.Crew.Where(res =>
            res.Job == "Director" || res.Job == "Screenplay" || res.Job == "Writer").ToList();
    }
}
