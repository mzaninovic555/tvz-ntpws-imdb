using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.TvShows;

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
        return fetchedMovie.ReleaseDates?.Results.FirstOrDefault(result =>
                result.Iso_3166_1 == "US" && result.ReleaseDates
                    .Any(releaseDate => releaseDate.Certification != "")
            )?.ReleaseDates.LastOrDefault(releaseDate => releaseDate.Certification != "")
            ?.Certification;
    }

    public static string? GetCertificationFromSeries(TvShow fetchedShow)
    {
        return fetchedShow.ContentRatings?.Results.FirstOrDefault(result =>
                result.Iso_3166_1 == "US" && !string.IsNullOrEmpty(result.Rating)
            )?.Rating;
    }

    public static List<WatchProviderItem>? GetWatchProvidersFromMovie(Movie fetchedMovie)
    {
        return fetchedMovie.WatchProviders.Results
            .SingleOrDefault(p => p.Key == "US")
            .Value
            ?.FlatRate; // TODO: get locale from browser
    }

    public static List<WatchProviderItem>? GetWatchProvidersFromSeries(TvShow fetchedShow)
    {
        return fetchedShow.WatchProviders.Results
            .SingleOrDefault(p => p.Key == "US")
            .Value
            ?.FlatRate; // TODO: get locale from browser
    }

    public static List<Crew>? GetCrewFromMovie(Movie fetchedMovie)
    {
        return fetchedMovie.Credits.Crew.Where(res =>
            res.Job == "Director" || res.Job == "Screenplay" || res.Job == "Writer").ToList();
    }

    public static List<Crew>? GetCrewFromSeries(TvShow fetchedShow)
    {
        return fetchedShow.Credits.Crew.Where(res =>
            res.Job == "Director" || res.Job == "Screenplay" || res.Department == "Writing").ToList();
    }

    public static List<TMDbLib.Objects.Movies.Cast>? GetTopCastFromMovie(Movie fetchedMovie)
    {
        return fetchedMovie.Credits.Cast
            .Where(res => !string.IsNullOrEmpty(res.ProfilePath))
            .OrderByDescending(res => res.Popularity)
            .ToList();
    }

    public static List<TMDbLib.Objects.TvShows.Cast>? GetTopCastFromSeries(TvShow fetchedShow)
    {
        return fetchedShow.Credits.Cast
            .Where(res => !string.IsNullOrEmpty(res.ProfilePath))
            .OrderByDescending(res => res.Popularity)
            .ToList();
    }
}
