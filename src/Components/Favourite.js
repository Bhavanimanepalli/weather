import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import "./Favourite.css";
import { useNavigate } from "react-router-dom";

function Favourite() {
  let date = new Date().toString();
  const [favcity, setfavcity] = useState([]);
  const { favouriteCitiesdata, key, setfavouriteCities } = useContext(context);
  const [showUpdate, setShowUpdate] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [newCityName, setNewCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    FavouritecityData();
  }, []);

  useEffect(() => {
    if (favouriteCitiesdata.length > 0) {
      WeatherData();
    }
  }, [favouriteCitiesdata]);

  const FavouritecityData = async () => {
    try {
      let res = await fetch("https://food-1-rcun.onrender.com/favcities");
      let data = await res.json();
      setfavouriteCities(data);
      console.log(data);
    } catch (error) {
      console.error("Fetching the data:", error);
    }
  };

  const WeatherData = async () => {
    try {
      const weatherDataPromises = favouriteCitiesdata.map((cityobj) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityobj.city}&appid=${key}`
        ).then((res) => res.json())
      );
      const weatherData = await Promise.all(weatherDataPromises);
      setfavcity(
        weatherData.map((city, index) => ({
          ...city,
          id: favouriteCitiesdata[index].id,
        }))
      );
      console.log(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const deleteCity = (id) => {
    fetch("https://food-1-rcun.onrender.com/favcities" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setfavcity((prev) => prev.filter((obj) => obj.id !== id));
        setfavouriteCities((prev) => prev.filter((obj) => obj.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting favorite city:", error);
      });
  };

  const updateCity = (id) => {
    setCityId(id);
    setShowUpdate(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${key}`
      );
      if (res.ok) {
        const updatedCity = { city: newCityName };
        let updateRes = await fetch(
          `https://food-1-rcun.onrender.com/favcities/${cityId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCity),
          }
        );
        let updatedData = await updateRes.json();
        setfavouriteCities((prev) =>
          prev.map((city) => (city.id === cityId ? updatedData : city))
        );
        setShowUpdate(false);
        setNewCityName("");
        setErrorMessage("");
      } else {
        setErrorMessage("Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error updating city name:", error);
    }
  };

  const navigateback = () => {
    navigate("/");
  };
  return (
    <>
      <div style={{ marginLeft: "15px" }} className="mt-5">
        {" "}
        <button onClick={navigateback} style={{ fontSize: "25px" }}>
          Back{" "}
        </button>
      </div>
      <div className="favourite-city-div">
        <h1
          className="text-dark"
          style={{ textAlign: "center" }}
        >
          Favourite Cities Details
        </h1>
        {favcity.length !== 0 ? ( 
          favcity.map((data, index) => (
            <div key={index} className="fav-weather ">
              <h3 className="text-dark">{data.name}</h3>
              <p className="text-dark">{date.slice(0, 10)}</p>
              <h3 className="text-dark">
                {Math.floor(data?.main?.temp - 273)}
                <sup>o</sup>C
              </h3>
              <button
                className=""
                onClick={() => updateCity(data.id)}
              >
                Update
              </button>
              <button
                class="text-dark"
                onClick={() => deleteCity(data.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}

        {showUpdate && (
          <div className="update-popup-div" style={{ marginTop: "100px" }}>
            <div
              className="update-popup-content"
              style={{ textAlign: "center" }}
            >
              <h3>Update City Name</h3>
              <input
                className="cityupdateinput"
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Enter new city name"
              />
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button onClick={handleUpdateSubmit} disabled={!newCityName}>
                Update
              </button>
              <button onClick={() => setShowUpdate(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
}

export default Favourite;