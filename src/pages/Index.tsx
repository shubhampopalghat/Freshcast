import React from "react";
import { WeatherProvider } from "@/context/WeatherContext";
import { useWeather } from "@/context/WeatherContext";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import WeeklyForecast from "@/components/WeeklyForecast";
import AQICard from "@/components/AQICard";
import NearbyCities from "@/components/NearbyCities";
import LoadingScreen from "@/components/LoadingScreen";
import { useIsMobile } from "@/hooks/use-mobile";

const WeatherDashboard: React.FC = () => {
  const { loading } = useWeather();
  const isMobile = useIsMobile();
  if (loading) {
    return <LoadingScreen />;
  }

  
  if (isMobile) {
    return (
      <div className="min-h-screen flex overflow-hidden">
        <div className="flex-1">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-6">
                <Sidebar />
                <SearchBar />
                <WeatherCard />
                <WeeklyForecast />
              </div>

              <div className="space-y-4">
                <AQICard />
                <NearbyCities />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 p-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SearchBar />
              <WeatherCard />
              <WeeklyForecast />
            </div>
            
            <div className="space-y-2">
              <AQICard />
              <NearbyCities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
};

export default IndexPage;
