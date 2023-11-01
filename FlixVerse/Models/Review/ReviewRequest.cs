using System.ComponentModel.DataAnnotations;
using FlixVerse.Models.Article;

namespace FlixVerse.Models.Review;

public class ReviewRequest
{
    [Required]
    public int ItemId { get; set; }

    [Required]
    public ItemType ItemType { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    [Range(minimum: 1, maximum: 5)]
    public int Grade { get; set; }

    [Required]
    public int UserId { get; set; }
}
