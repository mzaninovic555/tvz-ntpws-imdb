using FlixVerse.Configuration;
using FlixVerse.Services.Database;
using Microsoft.EntityFrameworkCore;

const string dbString = "Server=localhost;Port=5432;Database=flixverse;User Id=flixverse;Password=flixverse;";

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<FlixverseDbContext>(options => options.UseNpgsql(dbString));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<TmdbProperties>(builder.Configuration.GetSection(TmdbProperties.prefix));

// Security
builder.Services.AddAuthentication("Bearer").AddJwtBearer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();