import React from 'react';
import "./Dashboard.css"; 
import { useContext } from 'react';
import { context } from '../App';


export default function Dashboard() {
  const { date, List, todayweather } = useContext(context);
  console.log(List);
  let temperature = todayweather?.main?.temp;

  return (
    todayweather.cod === 200 ? 
    <div className='maindiv'>
      <div className='weather-container'>
        <p style={{ fontSize: "2rem", marginBottom: "10px" }}>Today's Weather</p>
        <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{Math.floor(temperature - 273)}<sup>o</sup>C</p>
        <p style={{ fontSize: "1rem", marginBottom: "5px" }}>Wind Speed: {todayweather?.wind?.speed} m/s</p>
        <p style={{ textTransform: "capitalize" }}>{todayweather?.weather[0]?.description}</p>
      </div>
    </div> 
    : ""
  );
}
