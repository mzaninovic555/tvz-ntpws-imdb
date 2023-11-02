using System.ComponentModel.DataAnnotations;
using FlixVerse.Models.Article;

namespace FlixVerse.Models.Review;

public class ReviewRequest
{
    [Required]
    public int ItemId { get; set; }

    [Required]
    public string ItemType { get; set; }

    public string Text { get; set; }

    [Required]
    [Range(minimum: 0, maximum: 6)]
    public int Grade { get; set; }
}
