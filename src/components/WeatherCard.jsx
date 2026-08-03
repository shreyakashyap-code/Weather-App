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
            <h2>weather.name</h2>
        </div>
    )
}
export default WeatherCard;
