using FlixVerse.Models.Article;

namespace FlixVerse.Models.Item;

public class GenericItemResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Poster { get; set; }
    public ItemType Type { get; set; }

    public GenericItemResponse(int id, string name, string poster, ItemType type)
    {
        Id = id;
        Name = name;
        Poster = poster;
        Type = type;
    }
}
