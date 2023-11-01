using FlixVerse.Data.Base;
using FlixVerse.Data.Context;
using FlixVerse.Models.Review;

namespace FlixVerse.Data;

public class ReviewRepository : BaseRepository<Review>
{
    public ReviewRepository(FlixverseDbContext flixverseDbContext) : base(flixverseDbContext)
    {
    }
}
