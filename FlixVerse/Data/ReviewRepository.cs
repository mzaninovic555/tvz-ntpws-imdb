using FlixVerse.Data.Base;
using FlixVerse.Data.Context;
using FlixVerse.Models.Article;
using FlixVerse.Models.Review;
using FlixVerse.Models.User;
using FlixVerse.Services.Security;

namespace FlixVerse.Data;

public class ReviewRepository : BaseRepository<Review>
{
    private readonly JwtService _jwtService;
    public ReviewRepository(FlixverseDbContext flixverseDbContext, JwtService jwtService) : base(flixverseDbContext)
    {
        _jwtService = jwtService;
    }

    public bool HasUserReviewedByItemId(int itemId, ItemType type)
    {
        var user = _jwtService.GetUsernameFromContext();
        if (user == null)
        {
            return false;
        }

        return FlixverseDbContext.Reviews
            .Any(review => review.UserId == user.Id && review.ItemId == itemId && review.ItemType == type);
    }
}
