import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineSearch, AiOutlineCloud } from "react-icons/ai";
import {
  BsCloudHaze,
  BsCloudDrizzle,
  BsSun,
  BsCloudRain,
  BsSnow3,
} from "react-icons/bs";
import { WiThunderstorm, WiCloudyWindy } from "react-icons/wi";

function App() {
  interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
    message: string;
  }

  interface forecastDataI {
    cod: string;
    message: number;
    cnt: number;
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      sys: {
        pod: string;
      };
      dt_txt: string;
    }[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }

  const [unav, setUnav] = useState(false);
  const [location, setLocation] = useState<string>();
  const [data, setData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<forecastDataI>();

  const APIkey: string = "6e768b9b7c2edbd142b2ea0f60092c2f";

  async function getCoords(loc: string) {
    let res = await fetch(`https://geocode.maps.co/search?q=${loc}`);
    let d = await res.json();
    console.log(d);
    if (d?.length < 1) {
      setUnav(true);
    }
    setLocation(d[0]?.display_name);
    getData(d[0]?.lat, d[0]?.lon);
    forecast(d[0]?.lat, d[0]?.lon);
  }

  async function getData(lt: number, lo: number) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${lo}&appid=${APIkey}&units=metric`
    );
    let d = await res.json();
    if (d.cod === 200) {
      setData(d);
    }
  }

  async function forecast(lt: number, lo: number) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lt}&lon=${lo}&appid=${APIkey}&units=metric`
    );
    let d = await res.json();
    if (d.cod < 400) {
      setForecastData(d);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getData(position.coords.latitude, position.coords.longitude);
        forecast(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
    if (data) {
      setLocation(data?.name + ", " + data?.sys?.country);
    }
  }, []);

  let icon = <BsSnow3 className="text-7xl sm:text-8xl md:text-9xl" />;

  function iconGiver(code: number | undefined, size: boolean = false) {
    let weatherCode = code;
    let iconSize = size
      ? "text-2xl sm:text-3xl md:text-4xl"
      : "text-7xl sm:text-8xl md:text-9xl";
    let icon;

    if (data !== undefined && weatherCode !== undefined) {
      try {
        if (weatherCode >= 200 && weatherCode <= 232) {
          // Thunderstorm
          icon = <WiThunderstorm className={iconSize} />;
        } else if (weatherCode >= 300 && weatherCode <= 321) {
          // Drizzle
          icon = <BsCloudDrizzle className={iconSize} />;
        } else if (weatherCode >= 500 && weatherCode <= 531) {
          // Rain
          icon = <BsCloudRain className={iconSize} />;
        } else if (weatherCode >= 600 && weatherCode <= 622) {
          // Snow
          icon = <BsSnow3 className={iconSize} />;
        } else if (weatherCode >= 701 && weatherCode <= 781) {
          // Atmosphere
          icon = <WiCloudyWindy className={iconSize} />;
        } else if (weatherCode === 800) {
          // Clear
          icon = <BsSun className={iconSize} />;
        } else if (weatherCode >= 801 && weatherCode <= 804) {
          // Clouds
          icon = <AiOutlineCloud className={iconSize} />;
        } else {
          // Other
          icon = <BsSun className={iconSize} />;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return icon;
  }

  return (
    <div className="flex flex-col min-h-screen image bg-opacity-80">
      <nav>
        <p className=" font-extralight text-4xl uppercase p-6 mt-4 mb-2 mx-3 flex justify-between">
          <div> आजको मौसम</div>
          <div> Aajako Mausam</div>
        </p>
      </nav>
      <div className="container mx-auto flex-grow">
        <div className=" flex justify-center mb-5">
          <div className=" flex w-[90%] md:w-5/ mx-auto bg-blue-200 bg-opacity-50 rounded-3xl border">
            <input
              className="w-full outline-none px-5 bg-white placeholder-gray-900 bg-opacity-0 text-black text-lg tracking-wider font-light py-1 rounded-3xl "
              placeholder="Enter the location!!"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const input = e.target as HTMLInputElement;
                  getCoords(input.value);
                }
              }}
            />
            <AiOutlineSearch
              size={"1.8em"}
              className=" text-gray-900 my-auto mx-3"
            />
          </div>
        </div>
        <div className="text-center capitalize font-light text-2xl">
          {location && !unav
            ? location
            : unav
            ? "Location not available."
            : data?.name + ", " + data?.sys?.country}
        </div>
        <div className="m-4">
          {data && (
            <div className="grid lg:grid-cols-2 ">
              <div className="  text-gray-950 md:mx-14 h-full card bg-white bg-opacity-50 rounded-3xl p-8 md:p-12 ">
                <div className="text-center pb-6">
                  <p className=" text-2xl md:text-4xl font-light">
                    <b className=" break-words">
                      {data?.name + ", " + data?.sys?.country}
                    </b>
                  </p>
                  <p className=" text-lg md:text-xl font-light mt-2">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <div className=" text-center flex justify-center">
                    {/* <AiOutlineCloud className=" text-center text-7xl sm:text-8xl md:text-9xl" /> */}
                    {iconGiver(data?.weather[0]?.id)}
                  </div>
                  <div className=" flex flex-col text-center h-full w-full justify-center">
                    <p className=" text-3xl sm:text-5xl md:text-7xl font-light">
                      {data?.main?.temp}{" "}
                      <span className=" md:text-5xl">°C</span>
                    </p>
                  </div>
                </div>
                <p className=" text-center font-light capitalize text-lg md:text-xl">
                  {data?.weather[0]?.description}
                </p>
              </div>
              <div className=" bg-white card h-full text-gray-950 md:mx-14 bg-opacity-50 rounded-3xl p-8 mt-6 lg:mt-0 md:p-12 ">
                <div className="grid grid-cols-2 h-full text-center text-xl md:text-2xl font-light capitalize">
                  <div className="flex flex-col h-full  justify-between">
                    <div>
                      <p>Feels like</p>
                      <b>{data?.main?.feels_like} °C</b>
                    </div>
                    <div>
                      <p>Minimum</p>
                      <b>{data?.main?.temp_min} °C</b>
                    </div>
                    <div>
                      <p>Maximum</p>
                      <b>{data?.main?.temp_max} °C</b>
                    </div>
                  </div>
                  <div className="flex flex-col h-full text-center">
                    <div className="flex flex-col h-full  justify-between">
                      <div>
                        <p>Humidity</p>
                        <b>{data?.main?.humidity}</b>
                      </div>
                      <div>
                        <p>Wind</p>
                        <b>{data?.wind?.speed}</b>
                      </div>
                      <div>
                        <p>Pressure</p>
                        <b>{data?.main?.pressure}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-9 mb-5 capitalize font-light text-2xl">
            Forecast
          </div>

          <div className=" grid grid-cols-4 text-gray-950 my:6 md:my-3  md:mx-14 gap-x-3">
            {forecastData?.list?.slice(0, 4).map((t) => (
              <div className=" bg-blue-200 py-3 card2 rounded-xl text-center flex flex-col bg-opacity-50 justify-center items-center">
                <b className=" font-light text-xl">
                  {t?.dt_txt?.split(" ")[1].split(":")[0] +
                    ":" +
                    t?.dt_txt?.split(" ")[1].split(":")[1]}
                </b>
                <p className=" font-light text-lg">{t?.weather[0]?.main}</p>

                {iconGiver(t?.weather[0]?.id, true)}

                <p className=" font-light text-lg">{t?.main?.temp} °C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-center font-light text-xl bg-blue-500 py-2 bg-opacity-80">
        <p>Created without 💙 by Chin Chin</p>
      </footer>
    </div>
  );
}

export default App;
