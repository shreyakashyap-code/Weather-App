function WeatherCard({ weather }){
    if(!weather) {
        return (
            <div className="weather-card">
                <h3>No Weather Data</h3>
                <p>Search for a city</p>
            </div>
        );
    }
    return(
        <div className="weather-card">
            <h2>{weather.name}</h2>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <h3>{weather.weather[0].main}</h3>
            <div>
                <p>
                    <strong>Humidity: </strong>{weather.main.humidity} %
                </p>
                <p>
                    <strong>Wind Speed: </strong>{weather.wind.speed} m/s
                </p>
            </div>
        </div>
    )
}
export default WeatherCard;
