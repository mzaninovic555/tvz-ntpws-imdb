using System.Text;
using FlixVerse.Configuration;
using FlixVerse.Services.Database;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

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
builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection(JwtConfiguration.prefix));

builder.Services.AddScoped<JwtService>();


// Security
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("JwtConfiguration:Secret").Value!)),
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidateAudience = false,
        ValidateIssuer = false,
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    IdentityModelEventSource.ShowPII = true;
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();