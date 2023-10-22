using System.Linq.Expressions;
using FlixVerse.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace FlixVerse.Data.Base;

public class BaseRepository<T> : IRepositoryBase<T> where T : class
{
    protected FlixverseDbContext FlixverseDbContext { get; set; }

    public BaseRepository(FlixverseDbContext flixverseDbContext)
    {
        FlixverseDbContext = flixverseDbContext;
    }

    public IQueryable<T> GetAll() => FlixverseDbContext.Set<T>().AsNoTracking();

    public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression) =>
        FlixverseDbContext.Set<T>().Where(expression).AsNoTracking();

    public void Create(T entity)
    {
        FlixverseDbContext.Set<T>().Add(entity);
        FlixverseDbContext.SaveChanges();
    }

    public void Update(T entity) {
        FlixverseDbContext.Set<T>().Update(entity);
        FlixverseDbContext.SaveChanges();
    }

    public void Delete(T entity)
    {
        FlixverseDbContext.Set<T>().Remove(entity);
        FlixverseDbContext.SaveChanges();
    }
}
