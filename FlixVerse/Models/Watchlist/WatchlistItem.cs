
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FlixVerse.Models.Article;


namespace FlixVerse.Models.Watchlist;

[Table("Watchlist")]
public class WatchlistItem
{
    [Key]
    public long Id { get; set; }

    [Required]
    public long ItemId { get; set; }

    [Required]
    public ItemType Type { get; set; }

    [Required]
    public WatchlistItemStatus Status { get; set; }

    [ForeignKey(nameof(Models.User.User))]
    public long UserId { get; set; }

    public virtual User.User? User { get; set; }

    public WatchlistItem(long id, long itemId, ItemType type, long userId, WatchlistItemStatus status)
    {
        Id = id;
        ItemId = itemId;
        Type = type;
        UserId = userId;
        Status = status;
    }

    public WatchlistItem(long itemId, ItemType type, long userId, WatchlistItemStatus status)
    {
        ItemId = itemId;
        Type = type;
        UserId = userId;
        Status = status;
    }
}
