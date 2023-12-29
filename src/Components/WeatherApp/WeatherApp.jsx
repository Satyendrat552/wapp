import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';




export const WeatherApp = () => {
    let api_key ="d88e047b08f27bf1713259faa3dc963a";

    const [wicon,setWicon]= useState(cloud_icon);

  
    async function  search()  {

        const inputElement = document.querySelector('.cityinput');
        const cityName = inputElement.value.trim(); // Get the value of the input and trim any leading/trailing whitespace
      
        if (cityName === "") {
          return;
        }

        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;
       
        try {
            let response = await fetch(url);
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
        let data = await response.json();

        if (data && data.main) 
        {
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = data.wind.speed+"kmph";
        temperature[0].innerHTML = data.main.temp + "°c ";
        location[0].innerHTML = data.name;

        if( data.weather[0].icon==="01d" || data.weather[0].icon==="01n" )
        {
           setWicon(clear_icon);
        }
        else if( data.weather[0].icon=== "02d" || data.weather[0].icon==="02n" )
        {
           setWicon(cloud_icon);
        }
        else if( data.weather[0].icon==="03d" || data.weather[0].icon==="03n" )
        {
           setWicon(cloud_icon);
        }
        else if( data.weather[0].icon==="04d" || data.weather[0].icon==="04n" )
        {
           setWicon(drizzle_icon);
        }
        else if( data.weather[0].icon==="09d" || data.weather[0].icon==="09n" )
        {
           setWicon(rain_icon);
        }
        else if( data.weather[0].icon==="10d" || data.weather[0].icon==="10n" )
        {
           setWicon(rain_icon);
        }
        else if( data.weather[0].icon==="13d" || data.weather[0].icon==="13n" )
        {
           setWicon(snow_icon);
        }
        else{
           setWicon(clear_icon);
        }
    

        }
        else
        {
            console.error("Data structure from API is not as expected.");
        }
      } 
      catch (error)
         {
        console.error("Error fetching data:", error);
         }

        
        }
    
    return (
        <>

            <div className='container'>
                <div className='topbar'>
                    <input type="text" className='cityinput' placeholder='search' />
                    <div className="search-icon" onClick={() => { search() }}>
                        <img src={search_icon} alt="search" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather-temp">24°c</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">18kmph</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default WeatherApp
