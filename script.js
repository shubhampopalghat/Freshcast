
let autocomplete;

function initAutocomplete() {
    const input = document.querySelector('.city-search');

    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            input.value = place.formatted_address || place.name;
        }
    });
}






const apiKey = "6453684fd96817bb165fbd7ac20c745b"; // Replace with your OpenWeatherMap API key
let currentWeatherData = null;  // Store current weather data
let isCelsius = true;  // Track current temperature unit



function toggleSearch() { 
     let input = document.getElementById("searchInput");
        const city = input.value.trim();
        if (city) {
            fetchWeatherByCity(city);  // Fetch weather immediately when clicking the icon
        }
    } 


function handleSearch(event) {
    if (event.key === "Enter") {
        let city = document.getElementById("searchInput").value.trim();
        if (city) {
            fetchWeatherByCity(city);  // Fetch weather immediately on Enter
        }
    }
}


function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            updateWeatherUI(data);
            updateSunData(data); 
            currentWeatherData = data;
            fetchForecast(data.coord.lat, data.coord.lon); // Fetch forecast after current weather
       
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}



function fetchWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            updateWeatherUI(data);
            updateSunData(data); 
            fetchForecast(lat, lon); // Fetch forecast after current weather
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function fetchForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            updateHighLowTemp(data);
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
        });
}

function updateWeatherUI(data) {
    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = Math.round(data.main.temp);
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weeklyForecast = document.getElementById("weekly-forecast");
    weeklyForecast.innerHTML = ""; // Clear previous forecast

    // Get next 6 days from today
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 1; i <= 6; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i); // Increment days

        const dayName = days[date.getDay()]; // Get weekday name
        const temp = Math.floor(Math.random() * (35 - 15) + 15); // Random temperature for demo

        // Create forecast card
        const card = document.createElement("div");
        card.classList.add("bg-[#1e293b]", "px-4", "py-2", "rounded-lg", "text-center", "forecast-card");

        card.innerHTML = `
            <p class="day text-sm">${dayName}</p>
            <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Weather" class="h-8 w-8 mx-auto">
            <p class="temp text-lg">${temp}°</p>
        `;

        weeklyForecast.appendChild(card);
    };

}

function updateForecastUI(forecastData) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; // Clear previous forecast data

    // Group forecast data by day
    const dailyForecast = {};
    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecast[date]) {
            dailyForecast[date] = item;
        }
    });

    // Display forecast for the next 4 days

}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            error => {
                console.error("Error detecting location:", error);
                document.getElementById("city").textContent = "Location access denied";
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}




window.onload = () => {
    // initAutocomplete();
    detectLocation();
    updateDateTime();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            () => {
                console.error("Location access denied");
                document.getElementById("city").textContent = "Location access denied";
            }
        );
    } else {
        console.error("Geolocation not supported");
    }

   
    
};



//sunset sunrise data

function updateDateTime() {
    const now = new Date();

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[now.getDay()];

    const date = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    document.getElementById("day").textContent = day;
    document.getElementById("full-date").textContent = `${date} ${month}, ${year}`;
}



function updateSunData(data) {
    const sunriseTimestamp = data.sys.sunrise * 1000;  // Convert to milliseconds
    const sunsetTimestamp = data.sys.sunset * 1000;

    const sunriseDate = new Date(sunriseTimestamp);
    const sunsetDate = new Date(sunsetTimestamp);

    // 🌅 Format Sunrise and Sunset
    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;  // 12-hour format
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    document.getElementById("sunrise").innerHTML = formatTime(sunriseDate);
    document.getElementById("sunset").innerHTML = formatTime(sunsetDate);

    // ⏰ Calculate Length of Day
    const dayLengthMs = sunsetTimestamp - sunriseTimestamp;
    const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
    const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("day-length").innerHTML = `${hours}h <span>${minutes}min</span>`;
}



// High and low temprature

function updateHighLowTemp(data) {
    const highTempEl = document.getElementById("high-temp");
    const lowTempEl = document.getElementById("low-temp");

    let highTemp = -Infinity;
    let lowTemp = Infinity;

    // Loop through forecast data to find min and max temps
    data.list.forEach(item => {
        highTemp = Math.max(highTemp, item.main.temp_max);
        lowTemp = Math.min(lowTemp, item.main.temp_min);
    });

    // Display the high and low temperatures
    highTempEl.textContent = `High: ${Math.round(highTemp)} °C`;
    lowTempEl.textContent = `Low: ${Math.round(lowTemp)} °C`;
}



// Toggle Temprature
function toggleUnits() {
    if (!currentWeatherData) return;

    const toggle = document.getElementById("unitToggle");
    const tempEl = document.getElementById("temp");
    const highTempEl = document.getElementById("high-temp");
    const lowTempEl = document.getElementById("low-temp");

    isCelsius = !isCelsius; // Toggle the unit

    const tempC = currentWeatherData.main.temp;
    const highC = currentWeatherData.main.temp_max;
    const lowC = currentWeatherData.main.temp_min;

    const tempF = (tempC * 9/5) + 32;
    const highF = (highC * 9/5) + 32;
    const lowF = (lowC * 9/5) + 32;

    // Update temperatures and units
    tempEl.textContent = isCelsius 
        ? `${Math.round(tempC)}` 
        : `${Math.round(tempF)}`;
    
    highTempEl.textContent = isCelsius 
        ? `High: ${Math.round(highC)} °C` 
        : `High: ${Math.round(highF)} °F`;
    
    lowTempEl.textContent = isCelsius 
        ? `Low: ${Math.round(lowC)} °C` 
        : `Low: ${Math.round(lowF)} °F`;
}







// Detect location on page load
// detectLocation();


