using FlixVerse.Models.Common;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;

namespace FlixVerse.Models.Movies;

public class MovieDetailsResponse : BaseDetailsResponse
{
    public DateTime? ReleaseDate { get; set; }
    public int? Runtime { get; set; }
    public List<WatchProviderItem>? StreamProviders { get; set; }
    public List<Cast> Cast { get; set; }


    public MovieDetailsResponse(
        int id,
        string title,
        List<Genre> genres,
        string overview,
        string status,
        string backdropPath,
        string posterPath,
        string? certification,
        string tagline,
        List<Crew> crew,
        DateTime? releaseDate,
        int? runtime,
        List<WatchProviderItem>? streamProviders,
        List<Cast> cast,
        bool? isAddedToWatchlist,
        bool? isUserReviewed) : base(id, title, genres, overview, status, backdropPath, posterPath, certification,
                                tagline, crew, isAddedToWatchlist, isUserReviewed)
    {
        ReleaseDate = releaseDate;
        Runtime = runtime;
        StreamProviders = streamProviders;
        Cast = cast;
    }
}
