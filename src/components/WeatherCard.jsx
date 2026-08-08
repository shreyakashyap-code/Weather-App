function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <div className="weather-card">

      <div className="weather-top">
        <div>
          <h2>
            📍 {weather.name}, {weather.sys.country}
          </h2>

          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <span className="star">☆</span>
      </div>

      <div className="main-weather">

        <div>
          <h1>{Math.round(weather.main.temp)}°C</h1>

          <h3>{weather.weather[0].main}</h3>

          <p>
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />

      </div>

      <div className="weather-info">

        <div>
          💧
          <span>
            <small>Humidity</small>
            <strong>{weather.main.humidity}%</strong>
          </span>
        </div>

        <div>
          💨
          <span>
            <small>Wind Speed</small>
            <strong>{weather.wind.speed} m/s</strong>
          </span>
        </div>

        <div>
          🌡️
          <span>
            <small>Pressure</small>
            <strong>{weather.main.pressure} hPa</strong>
          </span>
        </div>

        <div>
          👁️
          <span>
            <small>Visibility</small>
            <strong>
              {(weather.visibility / 1000).toFixed(1)} km
            </strong>
          </span>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;