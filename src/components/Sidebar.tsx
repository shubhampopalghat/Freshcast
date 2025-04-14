import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Home,
  PieChart,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  Sun,
  Moon,
  User,
  Bell,
  HelpCircle,
  Info,
  Menu
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const Sidebar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, openMapView, openForecastView, openAnalyticsView } = useWeather();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleThemeToggle = () => {
    toggleDarkMode();
    // Apply theme classes to document
    if (isDarkMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  if (isMobile) {
    return (
      <>
        <div className="flex items-center justify-between w-full">

          <div className="flex items-center justify-center flex-col gap-2 mt-7 ml-2">
           <img src="/logo.png"/>
            <h2 className="text-xs tracking-tighter">Freshcast</h2>
          </div>



          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen} >
            <SheetTrigger asChild>
              <a className="cursor-pointer group">
                <Menu
                  size={26}
                  className="text-text-secondary group-hover:text-brand transition-colors mt-2 mr-2"
                />
              </a>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card-bg border-tertiary w-[120px]">
              <SheetHeader>
                <SheetTitle className="text-xl text-white tracking-tighter font-medium">Menu</SheetTitle>
              </SheetHeader>
              <nav className=" flex flex-col justify-between p-5 items-center rounded-3xl mt-5 h-full animate-fade-in">
                <div className="flex flex-col items-center gap-10">

                  <div className="flex flex-col gap-10 items-center">
                    <a className="cursor-pointer group" onClick={() => setIsSettingsOpen(false)}>
                      <Home
                        size={24}
                        className="text-text-secondary group-hover:text-brand transition-colors"
                      />
                    </a>

                    <a className="cursor-pointer group" onClick={() => {
                      openAnalyticsView();
                      setIsSettingsOpen(false);
                    }}>
                      <PieChart
                        size={24}
                        className="text-text-secondary group-hover:text-brand transition-colors"
                      />
                    </a>

                    <a className="cursor-pointer group" onClick={() => {
                      openMapView();
                      setIsSettingsOpen(false);
                    }}>
                      <MapPin
                        size={24}
                        className="text-text-secondary group-hover:text-brand transition-colors"
                      />
                    </a>

                    <a className="cursor-pointer group" onClick={() => {
                      openForecastView();
                      setIsSettingsOpen(false);
                    }}>
                      <Calendar
                        size={24}
                        className="text-text-secondary group-hover:text-brand transition-colors"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-8 items-center mb-5">
                  <a className="cursor-pointer" onClick={() => setIsSettingsOpen(false)}>
                    <LogOut size={24} className="text-text-secondary hover:text-brand transition-colors" />
                  </a>

                  <div className="flex flex-col items-center gap-2">
                    <div className="relative flex items-center gap-2">
                      <Moon className="text-text-secondary h-4 w-4" />
                      <Switch
                        checked={isDarkMode}
                        onCheckedChange={() => {
                          handleThemeToggle();
                          setIsSettingsOpen(false);
                        }}
                        className="data-[state=checked]:bg-brand"
                      />
                      <Sun className="text-text-secondary h-4 w-4" />
                    </div>
                    <span className="text-xs text-text-secondary">Theme</span>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>



        </div>
      </>
    )
  }


  return (
    <nav className="ml-5 sticky top-5 flex flex-col justify-between p-5 items-center rounded-3xl mt-5 h-[95vh] bg-card-bg w-20 lg:w-24 animate-fade-in">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center justify-center flex-col gap-2">
       <img src="/logo.png" alt="logo" className=" h-10"/> 
          <h2 className="text-sm tracking-tighter">Freshcast</h2>
        </div>

        <div className="flex flex-col gap-10 items-center">
          <a className="cursor-pointer group">
            <Home
              size={24}
              className="text-text-secondary group-hover:text-brand transition-colors"
            />
          </a>

          <a className="cursor-pointer group" onClick={openAnalyticsView}>
            <PieChart
              size={24}
              className="text-text-secondary group-hover:text-brand transition-colors"
            />
          </a>

          <a className="cursor-pointer group" onClick={openMapView}>
            <MapPin
              size={24}
              className="text-text-secondary group-hover:text-brand transition-colors"
            />
          </a>

          <a className="cursor-pointer group" onClick={openForecastView}>
            <Calendar
              size={24}
              className="text-text-secondary group-hover:text-brand transition-colors"
            />
          </a>

          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <a className="cursor-pointer group">
                <Settings
                  size={24}
                  className="text-text-secondary group-hover:text-brand transition-colors"
                />
              </a>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card-bg border-tertiary w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-xl text-white">Settings</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Account</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-tertiary cursor-pointer transition-colors">
                      <User size={18} className="text-text-secondary" />
                      <span>Profile</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-tertiary cursor-pointer transition-colors">
                      <Bell size={18} className="text-text-secondary" />
                      <span>Notifications</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Appearance</h3>
                  <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-tertiary transition-colors">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? (
                        <Moon size={18} className="text-text-secondary" />
                      ) : (
                        <Sun size={18} className="text-text-secondary" />
                      )}
                      <span>Dark Theme</span>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={handleThemeToggle}
                      className="data-[state=checked]:bg-brand"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Help & Support</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-tertiary cursor-pointer transition-colors">
                      <HelpCircle size={18} className="text-text-secondary" />
                      <span>FAQ</span>
                    </div>
                    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-tertiary cursor-pointer transition-colors">
                      <Info size={18} className="text-text-secondary" />
                      <span>About</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <a className="cursor-pointer">
          <LogOut size={24} className="text-text-secondary hover:text-brand transition-colors" />
        </a>

        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center gap-2">
            <Moon className="text-text-secondary h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleThemeToggle}
              className="data-[state=checked]:bg-brand"
            />
            <Sun className="text-text-secondary h-4 w-4" />
          </div>
          <span className="text-xs text-text-secondary">Theme</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
