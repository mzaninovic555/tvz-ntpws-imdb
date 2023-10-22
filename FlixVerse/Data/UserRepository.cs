using FlixVerse.Data.Base;
using FlixVerse.Data.Context;
using FlixVerse.Models.User;

namespace FlixVerse.Data;

public class UserRepository : BaseRepository<User>
{
    public UserRepository(FlixverseDbContext flixverseDbContext) : base(flixverseDbContext)
    {
    }


}
