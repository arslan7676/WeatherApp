'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(""); // Clear previous errors

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        setWeatherData(res.data);
      } catch (err) {
        setError("City not found or API error.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-semibold mb-6">Weather App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter City"
          className="p-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {loading && <div className="spinner">Loading...</div>}

      {error && <div className="text-red-500">{error}</div>}

      {weatherData && !loading && (
        <div className="text-center">
          <h2 className="text-xl">{weatherData.name}</h2>
          <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-lg">Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
