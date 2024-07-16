import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = () => {
    const params = {
      key: apiKey,
      q: searchQuery,
    };
    const urlParams = new URLSearchParams(params);
    const urlWithParams = `https://api.weatherapi.com/v1/current.json?${urlParams.toString()}`;

    if (weatherData) {
      setWeatherData(null);
    }
    setIsLoading(true);
    fetch(urlWithParams)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        if (data.error) {
          alert("Failed to fetch weather data");
        } else {
          setWeatherData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setIsLoading((prev) => !prev);
      });
  };

  return (
    <>
      <div className="main">
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter city name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button type="button" onClick={getWeatherData}>
            Search
          </button>
        </div>
        {isLoading === true && <p>Loading data...</p>}
        {weatherData !== null && (
          <>
            <div className="weather-cards">
              <div className="weather-card">
                <p>Temperature</p>
                <span>
                  {`${weatherData.current.temp_c}`}
                  <span>&deg;C</span>
                </span>
              </div>
              <div className="weather-card">
                <p>Humidity</p>
                <span>{`${weatherData.current.humidity}%`}</span>
              </div>
              <div className="weather-card">
                <p>Condition</p>
                <span>{weatherData.current.condition.text}</span>
              </div>
              <div className="weather-card">
                <p>Wind Speed</p>
                <span>{`${weatherData.current.wind_kph} kph`}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
