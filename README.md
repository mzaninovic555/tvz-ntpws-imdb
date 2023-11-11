# tvz-ntpws-imdb - Flixverse

Projekt za kolegij Napredne tehnike projektiranja web servisa na diplomskom studiju Tehničkog Veleučilišta u Zagrebu, ak. god. 2023/24.
Korištene tehnologije:
- C#
- Dotnet 7
- React + Typescript
- Primereact, Primeflex, Primeicons
- Yup + react hook forms

Za pokretanje aplikacije potrebno postaviti sljedeće postavke u appsettings.json:
```
"TMDB": {
    "ApiKey": "",
    "BearerToken": ""
  },
  "JwtConfiguration": {
    "Secret": ""
  },
  "Cors": {
    "URLs": "http://localhost:5138"
  }
```
