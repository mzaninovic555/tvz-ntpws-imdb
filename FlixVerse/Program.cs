using System.Text;
using FlixVerse.Configuration;
using FlixVerse.Data;
using FlixVerse.Data.Context;
using FlixVerse.Services;
using FlixVerse.Services.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

const string dbString = "Server=localhost;Port=5432;Database=flixverse;User Id=flixverse;Password=flixverse;";
var corsPolicy = "_CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("Cors:URLs").Value!)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

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
builder.Services.AddScoped<WatchlistService>();

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<WatchlistRepository>();
builder.Services.AddScoped<ReviewRepository>();


builder.Services.AddHttpContextAccessor();

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

app.UseCors(corsPolicy);

app.UseHttpsRedirection();

// app.Use((ctx, next) =>
// {
//     ctx.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:5138";
//
//     return next();
// });

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
