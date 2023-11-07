using FlixVerse.Data;
using FlixVerse.Data.Context;
using FlixVerse.Models.Article;
using FlixVerse.Models.Common;
using FlixVerse.Models.Review;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers;

[ApiController]
[Route("reviews")]
public class ReviewController : ControllerBase
{
    private const int PageMultiplier = 5;

    private readonly ReviewRepository _reviewRepository;
    private readonly JwtService _jwtService;
    private readonly FlixverseDbContext _dbContext;

    public ReviewController(ReviewRepository reviewRepository, JwtService jwtService, FlixverseDbContext dbContext)
    {
        _reviewRepository = reviewRepository;
        _jwtService = jwtService;
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetReviewsForItem(int page, long itemId, ItemType type)
    {
        var res = (from review in _dbContext.Reviews
                join user in _dbContext.Users on review.UserId equals user.Id
                select new
                {
                    review.Id,
                    review.ItemId,
                    review.ItemType,
                    review.Text,
                    review.Grade,
                    review.UserId,
                    user.Username
                })
            .Where(review => review.ItemId == itemId && review.ItemType == type)
            .Skip(page * PageMultiplier)
            .Take(PageMultiplier)
            .Select(obj => new ReviewResponse(
                obj.Id,
                obj.ItemId,
                obj.ItemType,
                obj.Text,
                obj.Grade,
                obj.UserId,
                obj.Username
            ))
            .ToList();

        return Ok(res);
    }

    [HttpGet("score")]
    public IActionResult GetReviewScoreForItem(long itemId, ItemType type)
    {
        var filtered = _dbContext.Reviews
            .Where(item => item.ItemType == type && item.ItemId == itemId);

        return !filtered.Any()
            ? Ok(0)
            : Ok(filtered.Average(item => item.Grade));
    }

    [HttpPost]
    [Authorize]
    public IActionResult InsertNewReview([FromBody]ReviewRequest request)
    {
        var user = _jwtService.GetUsernameFromContext();

        var isParsed = ItemType.TryParse(request.ItemType, out ItemType itemTypeType);

        if (!isParsed)
        {
            return BadRequest("Something went wrong");
        }

        var newReview = new Review(request.ItemId, itemTypeType, request.Text, request.Grade, user!.Id);
        var reviewExists = _reviewRepository
            .GetByCondition(review => review.ItemId == newReview.ItemId && review.UserId == user!.Id)
            .Any();
        if (reviewExists)
        {
            return Conflict("User review for this item already exists");
        }

        _reviewRepository.Create(newReview);
        return Ok(new BasicResponse("Review added"));
    }

    [HttpPut]
    [Authorize]
    public IActionResult EditReview([FromBody]ReviewRequest request)
    {
        var user = _jwtService.GetUsernameFromContext();
        var isParsed = ItemType.TryParse(request.ItemType, out ItemType itemTypeType);

        if (!isParsed)
        {
            return BadRequest("Something went wrong");
        }

        var existingReview = _reviewRepository.GetByCondition(review =>
            review.UserId == user!.Id && review.ItemId == request.ItemId && review.ItemId == request.ItemId).FirstOrDefault();

        if (existingReview == null)
        {
            return NotFound("Review not found");
        }

        existingReview.Grade = request.Grade;
        existingReview.Text = request.Text;
        _reviewRepository.Update(existingReview);
        return Ok(new BasicResponse("Review edited"));
    }

    [HttpDelete]
    [Authorize]
    public IActionResult DeleteReview([FromBody]ReviewRequest request)
    {
        var user = _jwtService.GetUsernameFromContext();
        var isParsed = ItemType.TryParse(request.ItemType, out ItemType itemTypeType);

        if (!isParsed)
        {
            return BadRequest("Something went wrong");
        }

        var existingReview = _reviewRepository.GetByCondition(review =>
            review.UserId == user!.Id
            && review.ItemType == itemTypeType
            && review.ItemId == request.ItemId
            && review.ItemId == request.ItemId).FirstOrDefault();

        if (existingReview == null)
        {
            return NotFound("Review not found");
        }

        _reviewRepository.Delete(existingReview);
        return Ok(new BasicResponse("Review deleted"));
    }
}
