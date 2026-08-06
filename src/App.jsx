import {useState} from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const handleSearch = async () => {
  if (!city.trim()) return;

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    setWeather(res.data);
    console.log(res.data);
  } catch (error) {
    alert("City not found");
    console.log(error.response?.data);
  }
};

  return(
    <div className="app">
      <Navbar/>
      
      <div className="hero">
        <h1>Welcome to Weather App</h1>
        <p>Get the latest weather information of any city.</p>

        <SearchBar 
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
        />
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}
export default App;