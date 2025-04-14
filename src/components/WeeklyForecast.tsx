import React from "react";
import { useWeather } from "@/context/WeatherContext";
import { Sunrise, Sunset } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DailyForecast {
  date: string;
  icon: string;
  description: string;
  temp_max: number;
  temp_min: number;
}

const WeeklyForecast: React.FC = () => {
  const { forecastData, weatherData, isCelsius } = useWeather();
  const isMobile = useIsMobile();

  if (!forecastData || !weatherData) {
    return (
      <div className="mt-6 bg-card-bg rounded-3xl p-5 w-full animate-pulse flex items-center justify-center h-[30vh]">
        <p className="text-text-secondary">Loading forecast data...</p>
      </div>
    );
  }


  // Process forecast data to get daily forecasts
  const dailyForecasts: Record<string, any> = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min
      };
    } else {
      dailyForecasts[date].temp_max = Math.max(dailyForecasts[date].temp_max, item.main.temp_max);
      dailyForecasts[date].temp_min = Math.min(dailyForecasts[date].temp_min, item.main.temp_min);
    }
  });

  // Sort forecasts by date and select the next 6 days
  const sortedForecasts = Object.values(dailyForecasts)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(1, 6);

  // Convert temperature based on the selected unit
  const convertTemp = (temp: number): number => {
    return isCelsius ? temp : (temp * 9 / 5) + 32;
  };

  // Format time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  // Calculate day length
  const dayLengthMs = (weatherData.sys.sunset - weatherData.sys.sunrise) * 1000;
  const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
  const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));



  // mobile view


  if (isMobile) {
    return (
      <div className="mt-3 bg-card-bg rounded-3xl p-5 w-full animate-fade-in ">
        <h2 className="text-lg font-medium">Week Forecast</h2>

        <div className="flex gap-2 mt-4 overflow-x-auto w-full pb-2">
          {sortedForecasts.map((forecast, index) => (
            <div
              key={index}
              className="min-w-[120px] bg-tertiary p-3 rounded-xl flex flex-col items-center"
            >
              <p className="text-sm">
                {new Date(forecast.date).toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.icon}.png`}
                alt={forecast.description}
                className="w-12 h-12"
              />
              <div className="text-sm">
                <span className="font-bold">{Math.round(convertTemp(forecast.temp_max))}</span>
                <span className="text-text-secondary mx-1">/</span>
                <span className="text-text-secondary">{Math.round(convertTemp(forecast.temp_min))}</span>
                <span>{isCelsius ? "°C" : "°F"}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-tertiary p-4 rounded-lg flex gap-4 flex-wrap w-full ">
          <div className="flex justify-between w-full">
            <div className="ml-2 flex items-center gap-4">
              <Sunrise size={20} className="text-yellow-400" />
              <div className="">
                <p className="text-sm text-text-secondary">Sunrise</p>
                <p className="text-xl font-semibold">{formatTime(weatherData.sys.sunrise)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Sunset size={20} className="text-orange-400" />
              <div>
                <p className="text-sm text-text-secondary">Sunset</p>
                <p className="text-xl font-semibold">{formatTime(weatherData.sys.sunset)}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full bg-tertiary mr-2">
            <p className="ml-2 text-xl tracking-tighter text-text-secondary">Length of day: </p>
            <p className="text-xl font-semibold">{hours}h {minutes}min</p>
          </div>
        </div>
      </div>

    )
  }


  return (
    <div className="mt-3 bg-card-bg rounded-3xl p-5 w-full animate-fade-in ">
      <h2 className="text-lg font-medium">Week Forecast</h2>

      <div className="flex gap-2 mt-4 overflow-none w-full pb-2">
        {sortedForecasts.map((forecast, index) => (
          <div
            key={index}
            className="min-w-[18.9%] bg-tertiary p-3 rounded-xl flex flex-col items-center"
          >
            <p className="text-sm">{new Date(forecast.date).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.icon}.png`}
              alt={forecast.description}
              className="w-12 h-12"
            />
            <div className="text-sm">
              <span className="font-bold">{Math.round(convertTemp(forecast.temp_max))}</span>
              <span className="text-text-secondary mx-1">/</span>
              <span className="text-text-secondary">{Math.round(convertTemp(forecast.temp_min))}</span>
              <span>{isCelsius ? "°C" : "°F"}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-tertiary p-4 rounded-lg flex gap-8 flex-wrap">
        <div className="ml-2 flex items-center gap-2">
          <Sunrise size={20} className="text-yellow-400" />
          <div className="">
            <p className="text-sm text-text-secondary">Sunrise</p>
            <p className="text-xl font-bold">{formatTime(weatherData.sys.sunrise)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunset size={20} className="text-orange-400" />
          <div>
            <p className="text-sm text-text-secondary">Sunset</p>
            <p className="text-xl font-bold">{formatTime(weatherData.sys.sunset)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-text-secondary">Length of day</p>
          <p className="text-xl font-bold">{hours}h {minutes}min</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
