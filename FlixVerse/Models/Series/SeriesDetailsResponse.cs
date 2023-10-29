using FlixVerse.Models.Common;
using TMDbLib.Objects.General;
using TMDbLib.Objects.TvShows;

namespace FlixVerse.Models.Series;

public class SeriesDetailsResponse : BaseDetailsResponse
{
    public DateTime? StartReleaseDate { get; set; }
    public DateTime? EndReleaseDate { get; set; }
    public List<WatchProviderItem>? StreamProviders { get; set; }
    public List<Cast> Cast { get; set; }

    public int? NumberOfSeasons { get; set; }

    public SeriesDetailsResponse(
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
        DateTime? startReleaseDate,
        DateTime? endReleaseDate,
        List<WatchProviderItem>? streamProviders,
        List<Cast> cast,
        int? numberOfSeasons) : base(id, title, genres, overview, status, backdropPath, posterPath, certification,
                                tagline, crew)
    {
        StartReleaseDate = startReleaseDate;
        EndReleaseDate = endReleaseDate;
        StreamProviders = streamProviders;
        Cast = cast;
        NumberOfSeasons = numberOfSeasons;
    }
}
