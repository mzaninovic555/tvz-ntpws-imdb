﻿using System.ComponentModel.DataAnnotations;

namespace FlixVerse.Models.Watchlist;

public class WatchlistRequest
{
    [Required]
    public long ItemId { get; set; }
}
