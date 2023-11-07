using FlixVerse.Models.Article;

namespace FlixVerse.Models.Review;

public class ReviewResponse
{
    public long Id { get; set; }

    public int ItemId { get; set; }

    public string ItemType { get; set; }

    public string Text { get; set; }

    public int Grade { get; set; }

    public long UserId { get; set; }

    public string AuthorUsername { get; set; }

    public ReviewResponse(long id, int itemId, ItemType itemType, string text, int grade, long userId, string authorUsername)
    {
        Id = id;
        ItemId = itemId;
        ItemType = itemType.ToString();
        Text = text;
        Grade = grade;
        UserId = userId;
        AuthorUsername = authorUsername;
    }
}
