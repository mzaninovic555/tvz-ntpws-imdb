using TMDbLib.Objects.General;

namespace FlixVerse.Models.Common;

public class BaseDetailsResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<Genre> Genres { get; set; }
    public string Overview { get; set; }
    public string Status { get; set; }
    public string BackdropPath { get; set; }
    public string PosterPath { get; set; }
    public string? Certification { get; set; }
    public string Tagline { get; set; }
    public List<Crew> Crew { get; set; }

    public BaseDetailsResponse(int id, string title, List<Genre> genres, string overview,
        string status, string backdropPath, string posterPath, string? certification,
        string tagline, List<Crew> crew)
    {
        Id = id;
        Title = title;
        Genres = genres;
        Overview = overview;
        Status = status;
        BackdropPath = backdropPath;
        PosterPath = posterPath;
        Certification = certification;
        Tagline = tagline;
        Crew = crew;
    }
}
