import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
      setError("City Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="hero">
        {!weather && !loading && !error && (
          <>
            <h1>Welcome to Weather App</h1>

            <p>
              Get the latest weather information
              <br />
              of any city in the world.
            </p>

            <SearchBar
              city={city}
              setCity={setCity}
              handleSearch={handleSearch}
            />
          </>
        )}

        {/* Loading State */}
        {loading && (
          <>
            <h1>Get the latest weather</h1>

            <p>information of any city.</p>

            <SearchBar
              city={city}
              setCity={setCity}
              handleSearch={handleSearch}
            />

            <div className="loading-box">
              <div className="spinner"></div>

              <h3>Fetching weather data...</h3>

              <p>Please wait</p>
            </div>
          </>
        )}

        {/* Error State */}
        {!loading && error && (
        <>
          <h1>Welcome to Weather App</h1>

          <p>
            Get the latest weather information
            <br />
            of any city in the world.
          </p>

          <SearchBar
            city={city}
            setCity={setCity}
            handleSearch={handleSearch}
          />

          <div className="error-message">
            ❌ {error}
          </div>
        </>
)}

        {/* Success State */}
        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}
      </div>
    </div>
  );
}

export default App;