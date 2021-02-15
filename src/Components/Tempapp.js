import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setcity] = useState("");
  const [lat, setlat] = useState("");
  const [lon, setlon] = useState("");
  const [search, setsearch] = useState("Mumbai");
  const showposition = (position) => {
    setlat(position.coords.latitude);
    setlon(position.coords.longitude);
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showposition);

    const fun = async () => {
      const u = `https://us1.locationiq.com/v1/reverse.php?key=pk.0ea17ec4a9506ee3eb01af9338314742&lat=${lat}&lon=${lon}&format=json`;
      const res = await fetch(u);
      const c = await res.json();
      if (c.address) {
        console.log(c.address.state);
        setsearch(c.address.state);
      }
    };
    fun();
  }

  //   const r = await fetch(u);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fbcd14697856476288cce483ecbba02f`;
      const response = await fetch(url);
      //   console.log(response);
      const resJson = await response.json();
      //   console.log(resJson);
      //   console.log(resJson.name);
      //   console.log(resJson.main.temp_max);
      setcity(resJson.main);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            value={search}
            onChange={(event) => {
              setsearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p className="errorMsg">No data found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">{city.temp}°C</h1>
              <h3 className="tempmin_max">
                Max temp: {city.temp_max}°C | Min Temp: {city.temp_min}°C
              </h3>
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
