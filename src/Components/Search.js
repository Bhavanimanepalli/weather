import React, { useState, useEffect, useContext } from 'react';
import "./Search.css"; 
import { context } from '../App';
import { Link } from 'react-router-dom';

export default function Search() {
  const {
    cityname,
    setcityname,
    todayweather,
    settodayweather,
    key,
    dailyweather,
    setfavouriteCities,
    favouriteCitiesdata,
    setdailyweather
  } = useContext(context);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cityname);

  const fetchData = async () => {
    console.log("API called");
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`);
      let data = await response.json();
      if (data.cod !== 200) {
        alert("Enter a valid city name");
      }
      console.log(data);
      settodayweather(data);
      const { lat, lon } = data.coord;
      console.log(lat, lon);
      const weeklyWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
      const weeklyWeatherData = await weeklyWeatherResponse.json();
      console.log(weeklyWeatherData);
      setdailyweather(weeklyWeatherData.list.filter((cur, index) => index % 8 === 0));
      console.log(dailyweather);
    } catch (error) {
      console.error(error, "error");
    }
  };

  useEffect(() => {
    if (cityname !== "") {
      fetchData();
    }
  }, [searchTerm]);

  const addToFavorites = async () => {
    try {
      const cityExists = favouriteCitiesdata.some(city => city.city.toLowerCase() === cityname.toLowerCase());

      if (cityExists) {
        alert("City is already in favorites");
        return;
      } else if (cityname === "") {
        alert("Enter city name");
        return;
      }

      const response = await fetch(`https://food-noq0.onrender.com/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityname }),
      });

      if (!response.ok) throw new Error('Failed to add city to favorites');
      const data = await response.json();
      setfavouriteCities((prevCities) => [...prevCities, data]);
      alert("City added to favorites");
    } catch (error) {
      console.error('Error adding city to favorites:', error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Weather Forecast</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder='Enter city name'
          value={cityname}
          onChange={(e) => setcityname(e.target.value)}
        />
        <button onClick={() => {
          setSearchTerm(cityname);
        }}>Search</button>
        <Link to="/favourites"><button>Favorites</button></Link>
        <button onClick={addToFavorites}>Add to favorites</button>
      </div>
    </>
  );
}
 