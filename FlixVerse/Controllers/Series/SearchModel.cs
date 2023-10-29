﻿using TMDbLib.Objects.General;

namespace FlixVerse.Controllers.Series;

public class SearchModel
{
    public int Page { get; set; } = 0;
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public int[]? Genre { get; set; }
}
