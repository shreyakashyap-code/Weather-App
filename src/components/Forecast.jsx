import { useEffect, useState } from "react";
import axios from "axios";

function Forecast({ weather }) {

  const [forecast, setForecast] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {

    if (!weather) return;

    const getForecast = async () => {

      try {

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_KEY}&units=metric`
        );

        const list = res.data.list;

        // Get one forecast for each day
        const days = [];

        list.forEach((item) => {

          const date = item.dt_txt.split(" ")[0];

          if (!days.some((day) => day.date === date)) {

            days.push({
              date: date,
              data: item,
            });

          }

        });

        setForecast(days.slice(0, 5));

      } catch (error) {

        console.log(
          "Forecast error:",
          error
        );

      }

    };

    getForecast();

  }, [weather, API_KEY]);


  return (
    <div className="forecast-section">

      <h2>📅 5-Day Forecast</h2>

      <div className="forecast-container">

        {forecast.map((item, index) => {

          const day = item.data;

          const date = new Date(
            day.dt * 1000
          );

          return (
            <div
              className="forecast-card"
              key={item.date}
            >

              <h3>
                {index === 0
                  ? "Today"
                  : date.toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
              </h3>

              <p className="forecast-date">
                {date.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />

              <h3>
                {Math.round(day.main.temp)}°C
              </h3>

              <p>
                {day.weather[0].description}
              </p>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default Forecast;