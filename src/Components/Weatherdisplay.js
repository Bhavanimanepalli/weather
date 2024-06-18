import React, { useContext } from 'react';
import "./Weatherdisplay.css"; 
import { context } from '../App';


export default function Weatherdisplay() {
  let { dailyweather } = useContext(context);
  console.log(dailyweather);

  return (
    <div>
      {dailyweather ?
        dailyweather.map((weather, index) => (
          <div key={index}>
            <div className='weather-display'>
              <p className='weather-info'>{new Date(weather?.dt_txt).toDateString()}</p>
              <p className='weather-info'>{Math.floor(weather?.main?.temp - 273)}<sup>o</sup>C</p>
              <p className='weather-info'>{weather?.weather[0]?.description[0].toUpperCase() + weather?.weather[0]?.description.slice(1)}</p>
            </div>
          </div>
        ))
        : <p>No weather data available</p>
      }
    </div>
  );
}