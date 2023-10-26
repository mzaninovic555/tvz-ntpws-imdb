namespace FlixVerse.Models.Article;

public class GenericItemCarouselResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Poster { get; set; }
    public ItemType Type { get; set; }

    public GenericItemCarouselResponse(int id, string name, string poster, ItemType type)
    {
        Id = id;
        Name = name;
        Poster = poster;
        Type = type;
    }
}
