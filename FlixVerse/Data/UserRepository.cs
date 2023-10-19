using FlixVerse.Data.Base;
using FlixVerse.Models;
using FlixVerse.Services.Database;

namespace FlixVerse.Data;

public class UserRepository : BaseRepository<User>
{
    public UserRepository(FlixverseDbContext flixverseDbContext) : base(flixverseDbContext)
    {
    }


}