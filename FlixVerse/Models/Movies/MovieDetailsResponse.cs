using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;

namespace FlixVerse.Models.Movies;

public class MovieDetailsResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsAdult { get; set; }
    public List<Genre> Genres { get; set; }
    public string Overview { get; set; }
    public DateTime? ReleaseDate { get; set; }
    public int? Runtime { get; set; }
    public string Status { get; set; }
    public List<WatchProviderItem>? StreamProviders { get; set; }
    public string BackdropPath { get; set; }
    public string PosterPath { get; set; }
    public string? Certification { get; set; }
    public string Tagline { get; set; }
    public List<Crew> Crew { get; set; }
    public List<Cast> Cast { get; set; }

    public MovieDetailsResponse(int id, string title, bool isAdult, List<Genre> genres,
        string overview, DateTime releaseDate, int runtime, string status,
        List<WatchProviderItem> streamProviders, string backdropPath, string posterPath, string certification,
        string tagline, List<Crew> crew, List<Cast> cast)
    {
        Id = id;
        Title = title;
        IsAdult = isAdult;
        Genres = genres;
        Overview = overview;
        ReleaseDate = releaseDate;
        Runtime = runtime;
        Status = status;
        StreamProviders = streamProviders;
        BackdropPath = backdropPath;
        PosterPath = posterPath;
        Certification = certification;
        Tagline = tagline;
        Crew = crew;
        Cast = cast;
    }
}
