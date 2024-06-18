import logo from './logo.svg';
import './App.css';
import Dashboard from "./Components/Dashboard";
import Search from "./Components/Search";
import Weatherdisplay from "./Components/Weatherdisplay";
import { createContext, useState } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { ToastContainer } from "react-bootstrap"; 
import FavouriteCities from "./Components/Favourite";


export const context = createContext();
function App() {
   
  const [cityname, setcityname] = useState("");
  const [todayweather, settodayweather] = useState("");
  const [dailyweather, setdailyweather] = useState("");
  const [List, setList] = useState("");
  const [date, setDate] = useState("");
  const [favouriteCitiesdata,setfavouriteCities] = useState("")
  const key = "9f5947d25c12a41faf47e95024e4f3fc"
  return (
    <div>
      <context.Provider
        value={{
          cityname,
          setcityname,
          todayweather,
          settodayweather,
          dailyweather,
          setdailyweather,
          List,
          setList,
          date,setDate,key,favouriteCitiesdata,setfavouriteCities
        }}
      >
        <BrowserRouter>

      
       <Routes>
        <Route path="/" element={<><Search/> <Dashboard/> <Weatherdisplay /> </>}/>
        <Route path="/favourites" element={<FavouriteCities />} /> 
        </Routes> 
      </BrowserRouter>
   
      </context.Provider>
    </div>
  );
}

