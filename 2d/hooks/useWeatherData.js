import { useState, useEffect } from 'react';

// OpenWeatherMap free API endpoint
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'default_free_tier_key_required_here'; 
const FALLBACK_LAT = 28.6139; // New Delhi
const FALLBACK_LON = 77.2090;

export const useWeatherData = () => {
  const [weather, setWeather] = useState({
    temperature: 0,
    condition: 'Clear',
    city: 'New Delhi',
    sunrise: new Date().setHours(6, 0, 0),
    sunset: new Date().setHours(18, 0, 0),
    isDay: true,
    moonPhase: 'Full',
    loading: true,
    error: null
  });

  useEffect(() => {
    // For now, we will simulate the weather data if no API key is provided
    // to ensure the Living World Engine always runs.
    // In production, you would fetch from OpenWeatherMap.
    
    const simulateWeather = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      const isDay = currentHour >= 6 && currentHour < 18;
      let condition = 'Clear';
      if (Math.random() > 0.8) condition = 'Rain';
      else if (Math.random() > 0.6) condition = 'Clouds';

      setWeather({
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35 C
        condition: condition,
        city: 'Local Space',
        sunrise: new Date().setHours(6, 0, 0),
        sunset: new Date().setHours(18, 0, 0),
        isDay: isDay,
        moonPhase: 'Waxing Crescent',
        loading: false,
        error: null
      });
    };

    const fetchRealLocation = () => {
      if (navigator.geolocation && import.meta.env.VITE_WEATHER_API_KEY) {
        navigator.geolocation.getCurrentPosition(
            // Success
            async (position) => {
              // TODO: Fetch from actual API
              simulateWeather();
            },
            // Error
            (err) => {
              console.warn("Geolocation denied, using fallback.");
              simulateWeather();
            }
        );
      } else {
        simulateWeather();
      }
    };

    fetchRealLocation();
  }, []);

  return weather;
};
