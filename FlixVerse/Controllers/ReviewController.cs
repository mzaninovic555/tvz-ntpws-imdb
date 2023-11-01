using FlixVerse.Data;
using FlixVerse.Models.Article;
using FlixVerse.Models.Review;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlixVerse.Controllers;

[ApiController]
[Route("review")]
public class ReviewController : ControllerBase
{
    private readonly ReviewRepository _reviewRepository;
    private readonly JwtService _jwtService;

    public ReviewController(ReviewRepository reviewRepository, JwtService jwtService)
    {
        _reviewRepository = reviewRepository;
        _jwtService = jwtService;
    }

    [HttpGet]
    public IActionResult GetReviewsForItem(long itemId, ItemType type)
    {
        var res = _reviewRepository
            .GetByCondition(review => review.ItemId == itemId && review.ItemType == type).ToList();
        return Ok(res);
    }

    [HttpPost]
    [Authorize]
    public IActionResult InsertNewReview(ReviewRequest request)
    {
        if (_jwtService.GetUsernameFromContext()!.Id != request.UserId)
        {
            return Unauthorized();
        }

        var newReview = new Review(request.ItemId, request.ItemType, request.Text, request.Grade, request.UserId);
        var reviewExists = _reviewRepository
            .GetByCondition(review => review.ItemId == newReview.ItemId && review.UserId == request.UserId)
            .Any();
        if (reviewExists)
        {
            return Conflict("User review for this item already exists");
        }

        _reviewRepository.Create(newReview);
        return Ok();
    }
}
