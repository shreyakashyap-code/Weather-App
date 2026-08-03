import {useState} from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  
  const handleSearch = () => {
    console.log(city);
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