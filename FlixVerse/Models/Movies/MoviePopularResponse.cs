namespace FlixVerse.Models.Movies;

public class MoviePopularResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string CoverImage { get; set; }

    public MoviePopularResponse(int id, string title, string coverImage)
    {
        Id = id;
        Title = title;
        CoverImage = coverImage;
    }
}
