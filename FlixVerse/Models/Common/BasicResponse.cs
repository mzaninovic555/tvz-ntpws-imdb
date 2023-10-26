namespace FlixVerse.Models.Common;

public class BasicResponse
{
    public string Message { get; set; }

    public BasicResponse(string message)
    {
        Message = message;
    }
}
