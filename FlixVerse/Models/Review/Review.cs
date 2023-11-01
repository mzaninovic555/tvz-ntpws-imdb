using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FlixVerse.Models.Article;

namespace FlixVerse.Models.Review;

[Table(("Reviews"))]
public class Review
{
    [Key]
    public long Id { get; set; }

    [Required]
    public int ItemId { get; set; }

    [Required]
    public ItemType ItemType { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    [Range(minimum: 1, maximum: 5)]
    public int Grade { get; set; }

    [ForeignKey(nameof(User.User))]
    public long UserId { get; set; }

    public Review(long id, int itemId, ItemType itemType, string text, int grade, long userId)
    {
        Id = id;
        ItemId = itemId;
        ItemType = itemType;
        Text = text;
        Grade = grade;
        UserId = userId;
    }

    public Review(int itemId, ItemType itemType, string text, int grade, long userId)
    {
        ItemId = itemId;
        ItemType = itemType;
        Text = text;
        Grade = grade;
        UserId = userId;
    }
}
