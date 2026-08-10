import { useState } from "react";
import axios from "axios";

import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Forecast from "./components/Forecast";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // PAGE
  // =========================

  const [currentPage, setCurrentPage] = useState("home");

  // =========================
  // FAVORITES
  // =========================

  const [favoriteCities, setFavoriteCities] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("favoriteCities")) || []
    );
  });

  // =========================
  // RECENT SEARCHES
  // =========================

  const [recentSearches, setRecentSearches] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("recentSearches")) || []
    );
  });

  const API_KEY = import.meta.env.VITE_API_KEY;

  // =========================
  // HOME BUTTON
  // =========================

  const goHome = () => {
    setCurrentPage("home");
    setWeather(null);
    setError("");
    setLoading(false);
    setCity("");
  };

  // =========================
  // ABOUT BUTTON
  // =========================

  const goAbout = () => {
    setCurrentPage("about");
    setWeather(null);
    setError("");
    setLoading(false);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setCurrentPage("home");
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);

      // Recent Searches

      const searchedCity = res.data.name;

      const updatedRecent = [
        searchedCity,

        ...recentSearches.filter(
          (item) =>
            item.toLowerCase() !==
            searchedCity.toLowerCase()
        ),

      ].slice(0, 5);

      setRecentSearches(updatedRecent);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecent)
      );

      setCity(searchedCity);

    } catch (err) {
      console.log(err);

      setWeather(null);
      setError("City Not Found");

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH SAVED CITY
  // =========================

  const searchSavedCity = async (cityName) => {
    setCurrentPage("home");
    setCity(cityName);
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);

      const searchedCity = res.data.name;

      const updatedRecent = [
        searchedCity,

        ...recentSearches.filter(
          (item) =>
            item.toLowerCase() !==
            searchedCity.toLowerCase()
        ),

      ].slice(0, 5);

      setRecentSearches(updatedRecent);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecent)
      );

    } catch (err) {
      setWeather(null);
      setError("City Not Found");

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FAVORITE
  // =========================

  const toggleFavorite = (cityName) => {
    const exists = favoriteCities.some(
      (city) =>
        city.toLowerCase() ===
        cityName.toLowerCase()
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favoriteCities.filter(
        (city) =>
          city.toLowerCase() !==
          cityName.toLowerCase()
      );

    } else {
      updatedFavorites = [
        ...favoriteCities,
        cityName,
      ];
    }

    setFavoriteCities(updatedFavorites);

    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updatedFavorites)
    );
  };

  // =========================
  // DELETE RECENT
  // =========================

  const deleteRecent = (cityName) => {
    const updatedRecent = recentSearches.filter(
      (city) =>
        city.toLowerCase() !==
        cityName.toLowerCase()
    );

    setRecentSearches(updatedRecent);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecent)
    );
  };

  // =========================
  // CHECK FAVORITE
  // =========================

  const isFavorite = weather
    ? favoriteCities.some(
        (city) =>
          city.toLowerCase() ===
          weather.name.toLowerCase()
      )
    : false;

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        onHome={goHome}
        onAbout={goAbout}
        currentPage={currentPage}
      />

      {/* =========================
          ABOUT PAGE
      ========================= */}

      {currentPage === "about" && (

        <main className="about-page">

          <div className="about-card">

            <h1>🌤️ About Weather App</h1>

            <p>
              Weather App helps you quickly check the
              current weather of any city around the world.
            </p>

            <div className="about-features">

              <div>
                <span>🌡️</span>
                <h3>Current Weather</h3>

                <p>
                  Temperature, feels like temperature,
                  humidity, pressure and visibility.
                </p>
              </div>

              <div>
                <span>🌧️</span>
                <h3>Weather Conditions</h3>

                <p>
                  See whether the weather is clear,
                  cloudy, rainy, snowy or stormy.
                </p>
              </div>

              <div>
                <span>📅</span>
                <h3>5-Day Forecast</h3>

                <p>
                  Check the upcoming weather forecast
                  for the next five days.
                </p>
              </div>

              <div>
                <span>⭐</span>
                <h3>Favorite Cities</h3>

                <p>
                  Save your favorite cities for quick
                  access whenever you need them.
                </p>
              </div>

              <div>
                <span>🕘</span>
                <h3>Recent Searches</h3>

                <p>
                  Quickly access your recently searched
                  cities.
                </p>
              </div>

            </div>

            <button
              className="about-home-btn"
              onClick={goHome}
            >
              ⌂ &nbsp; Back to Home
            </button>

          </div>

        </main>

      )}

      {/* =========================
          HOME PAGE
      ========================= */}

      {currentPage === "home" && (

        <main className="hero">

          {/* =========================
              NORMAL HOME
          ========================= */}

          {!weather && !loading && !error && (

            <>

              <h1>
                Welcome to Weather App
              </h1>

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

              {/* FAVORITES */}

              {favoriteCities.length > 0 && (

                <div className="home-city-section">

                  <h3>
                    ⭐ Favorite Cities
                  </h3>

                  <div className="home-city-list">

                    {favoriteCities.map(
                      (favoriteCity) => (

                        <button
                          key={favoriteCity}
                          onClick={() =>
                            searchSavedCity(
                              favoriteCity
                            )
                          }
                        >
                          ⭐ {favoriteCity}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

              {/* RECENT */}

              {recentSearches.length > 0 && (

                <div className="home-city-section">

                  <h3>
                    🕘 Recent Searches
                  </h3>

                  <div className="home-recent-list">

                    {recentSearches.map(
                      (recentCity) => (

                        <div
                          className="recent-item"
                          key={recentCity}
                        >

                          <button
                            className="recent-city"
                            onClick={() =>
                              searchSavedCity(
                                recentCity
                              )
                            }
                          >
                            🕘 {recentCity}
                          </button>

                          <button
                            className="delete-recent"
                            onClick={() =>
                              deleteRecent(
                                recentCity
                              )
                            }
                          >
                            ✕
                          </button>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}

            </>

          )}

          {/* =========================
              LOADING
          ========================= */}

          {loading && (

            <>

              <h1>
                Get the latest weather
              </h1>

              <p>
                information of any city.
              </p>

              <SearchBar
                city={city}
                setCity={setCity}
                handleSearch={handleSearch}
              />

              <div className="loading-box">

                <div className="spinner"></div>

                <h3>
                  Fetching weather data...
                </h3>

                <p>
                  Please wait
                </p>

              </div>

            </>

          )}

          {/* =========================
              ERROR
          ========================= */}

          {!loading && error && (

            <>

              <h1>
                Oops!
              </h1>

              <p>
                We couldn't find any weather data
                <br />
                for the city you searched.
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

          {/* =========================
              WEATHER RESULT
          ========================= */}

          {weather && !loading && !error && (

            <div className="weather-result">

              <WeatherCard
                weather={weather}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />

              <Forecast
                weather={weather}
              />

            </div>

          )}

        </main>

      )}

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">
        © 2026 Shreya Kashyap. All rights reserved.
      </footer>

    </div>
  );
}

export default App;