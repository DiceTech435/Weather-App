//Weather App
let weatherForm = document.querySelector(".weatherForm");
let cityInput = document.querySelector(".cityInput");
let card = document.querySelector(".card");

import { apiKey, something } from "./env.js";

//Form function (on-submit)
weatherForm.addEventListener("submit", async e => {

    e.preventDefault();
    let city = cityInput.value;

    if(city){
        try{
            let weatherData = await getWeatherData(city);
            getWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a City");
    }
})

//promise fetch function
async function getWeatherData(city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
}

function getWeatherInfo(data){
    const {name: city, 
        main: {temp, humidity}, 
        weather:[{description, id}] } = data;

        card.textContent = "";
        card.style.display = "flex";

        let cityDisplay = document.createElement("h1");
        let tempDisplay = document.createElement("p");
        let humidityDisplay = document.createElement("p");
        let descDisplay = document.createElement("p");
        let weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}ºF`;
        humidityDisplay.textContent = `Humidty: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "💭";
        case (weatherId >= 300 && weatherId < 400):
            return "💭";
        case (weatherId >= 500 && weatherId < 600):
            return "💭";
        case (weatherId >= 600 && weatherId < 700):
            return "💭";
        case (weatherId >= 700 && weatherId < 800):
            return "🌁";
        case (weatherId == 800):
            return "💨";
        case (weatherId >= 801 && weatherId < 810):
            return "💭";
        default:
            return "❓";
    }
}

function displayError(message){
    let errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
