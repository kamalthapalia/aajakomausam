import React, { useState, useEffect } from "react";
import "./App.css";
import countries from "./countrycode";
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

  //   af: "Afghanistan",
  //   al: "Albania",
  //   dz: "Algeria",
  //   ad: "Andorra",
  //   ao: "Angola",
  //   ai: "Anguilla",
  //   ag: "Antigua and Barbuda",
  //   ar: "Argentina",
  //   am: "Armenia",
  //   aw: "Aruba",
  //   au: "Australia",
  //   at: "Austria",
  //   az: "Azerbaijan",
  //   bs: "Bahamas",
  //   bh: "Bahrain",
  //   bd: "Bangladesh",
  //   bb: "Barbados",
  //   by: "Belarus",
  //   be: "Belgium",
  //   bz: "Belize",
  //   bj: "Benin",
  //   bm: "Bermuda",
  //   bt: "Bhutan",
  //   bo: "Bolivia",
  //   ba: "Bosnia and Herzegovina",
  //   bw: "Botswana",
  //   br: "Brazil",
  //   bn: "Brunei Darussalam",
  //   bg: "Bulgaria",
  //   bf: "Burkina Faso",
  //   bi: "Burundi",
  //   kh: "Cambodia",
  //   cm: "Cameroon",
  //   ca: "Canada",
  //   cv: "Cape Verde",
  //   ky: "Cayman Islands",
  //   cf: "Central African Republic",
  //   td: "Chad",
  //   cl: "Chile",
  //   cn: "China",
  //   co: "Colombia",
  //   km: "Comoros",
  //   cg: "Congo",
  //   cd: "Congo, the Democratic Republic of the",
  //   ck: "Cook Islands",
  //   cr: "Costa Rica",
  //   ci: "Cote d'Ivoire",
  //   hr: "Croatia",
  //   cu: "Cuba",
  //   cy: "Cyprus",
  //   cz: "Czech Republic",
  //   dk: "Denmark",
  //   dj: "Djibouti",
  //   dm: "Dominica",
  //   do: "Dominican Republic",
  //   ec: "Ecuador",
  //   eg: "Egypt",
  //   sv: "El Salvador",
  //   gq: "Equatorial Guinea",
  //   er: "Eritrea",
  //   ee: "Estonia",
  //   et: "Ethiopia",
  //   fk: "Falkland Islands (Malvinas)",
  //   fo: "Faroe Islands",
  //   fj: "Fiji",
  //   fi: "Finland",
  //   fr: "France",
  //   gf: "French Guiana",
  //   pf: "French Polynesia",
  //   ga: "Gabon",
  //   gm: "Gambia",
  //   ge: "Georgia",
  //   de: "Germany",
  //   gh: "Ghana",
  //   gi: "Gibraltar",
  //   gr: "Greece",
  //   gl: "Greenland",
  //   gd: "Grenada",
  //   gp: "Guadeloupe",
  //   gu: "Guam",
  //   gt: "Guatemala",
  //   gn: "Guinea",
  //   gw: "Guinea-Bissau",
  //   gy: "Guyana",
  //   ht: "Haiti",
  //   va: "Holy See (Vatican City State)",
  //   hn: "Honduras",
  //   hk: "Hong Kong",
  //   hu: "Hungary",
  //   is: "Iceland",
  //   in: "India",
  //   id: "Indonesia",
  //   ir: "Iran, Islamic Republic of",
  //   iq: "Iraq",
  //   ie: "Ireland",
  //   im: "Isle of Man",
  //   il: "Israel",
  //   it: "Italy",
  //   jm: "Jamaica",
  //   jp: "Japan",
  //   jo: "Jordan",
  //   kz: "Kazakhstan",
  //   ke: "Kenya",
  //   ki: "Kiribati",
  //   kp: "Korea, Democratic Peoples Republic of",
  //   kr: "Korea, Republic of",
  //   kw: "Kuwait",
  //   kg: "Kyrgyzstan",
  //   la: "Lao Peoples Democratic Republic",
  //   lv: "Latvia",
  //   lb: "Lebanon",
  //   ls: "Lesotho",
  //   lr: "Liberia",
  //   ly: "Libyan Arab Jamahiriya",
  //   li: "Liechtenstein",
  //   lt: "Lithuania",
  //   lu: "Luxembourg",
  //   mo: "Macao",
  //   mk: "Macedonia, the former Yugoslav Republic of",
  //   mg: "Madagascar",
  //   mw: "Malawi",
  //   my: "Malaysia",
  //   mv: "Maldives",
  //   ml: "Mali",
  //   mt: "Malta",
  //   mh: "Marshall Islands",
  //   mq: "Martinique",
  //   mr: "Mauritania",
  //   mu: "Mauritius",
  //   yt: "Mayotte",
  //   mx: "Mexico",
  //   fm: "Micronesia, Federated States of",
  //   md: "Moldova, Republic of",
  //   mc: "Monaco",
  //   mn: "Mongolia",
  //   me: "Montenegro",
  //   ms: "Montserrat",
  //   ma: "Morocco",
  //   mz: "Mozambique",
  //   mm: "Myanmar",
  //   na: "Namibia",
  //   nr: "Nauru",
  //   np: "Nepal",
  //   nl: "Netherlands",
  //   an: "Netherlands Antilles",
  //   nc: "New Caledonia",
  //   nz: "New Zealand",
  //   ni: "Nicaragua",
  //   ne: "Niger",
  //   ng: "Nigeria",
  //   nu: "Niue",
  //   nf: "Norfolk Island",
  //   mp: "Northern Mariana Islands",
  //   no: "Norway",
  //   om: "Oman",
  //   pk: "Pakistan",
  //   pw: "Palau",
  //   ps: "Palestinian Territory, Occupied",
  //   pa: "Panama",
  //   pg: "Papua New Guinea",
  //   py: "Paraguay",
  //   pe: "Peru",
  //   ph: "Philippines",
  //   pn: "Pitcairn",
  //   pl: "Poland",
  //   pt: "Portugal",
  //   pr: "Puerto Rico",
  //   qa: "Qatar",
  //   re: "Reunion",
  //   ro: "Romania",
  //   ru: "Russian Federation",
  //   rw: "Rwanda",
  //   sh: "Saint Helena",
  //   kn: "Saint Kitts and Nevis",
  //   lc: "Saint Lucia",
  //   pm: "Saint Pierre and Miquelon",
  //   vc: "Saint Vincent and the Grenadines",
  //   ws: "Samoa",
  //   sm: "San Marino",
  //   st: "Sao Tome and Principe",
  //   sa: "Saudi Arabia",
  //   sn: "Senegal",
  //   rs: "Serbia",
  //   sc: "Seychelles",
  //   sl: "Sierra Leone",
  //   sg: "Singapore",
  //   sk: "Slovakia",
  //   si: "Slovenia",
  //   sb: "Solomon Islands",
  //   so: "Somalia",
  //   za: "South Africa",
  //   gs: "South Georgia and the South Sandwich Islands",
  //   ss: "South Sudan",
  //   es: "Spain",
  //   lk: "Sri Lanka",
  //   sd: "Sudan",
  //   sr: "Suriname",
  //   sj: "Svalbard and Jan Mayen",
  //   sz: "Swaziland",
  //   se: "Sweden",
  //   ch: "Switzerland",
  //   sy: "Syrian Arab Republic",
  //   tw: "Taiwan, Province of China",
  //   tj: "Tajikistan",
  //   tz: "Tanzania, United Republic of",
  //   th: "Thailand",
  //   tl: "Timor-Leste",
  //   tg: "Togo",
  //   tk: "Tokelau",
  //   to: "Tonga",
  //   tt: "Trinidad and Tobago",
  //   tn: "Tunisia",
  //   tr: "Turkey",
  //   tm: "Turkmenistan",
  //   tc: "Turks and Caicos Islands",
  //   tv: "Tuvalu",
  //   ug: "Uganda",
  //   ua: "Ukraine",
  //   ae: "United Arab Emirates",
  //   gb: "United Kingdom",
  //   us: "United States",
  //   um: "United States Minor Outlying Islands",
  //   uy: "Uruguay",
  //   uz: "Uzbekistan",
  //   vu: "Vanuatu",
  //   ve: "Venezuela, Bolivarian Republic of",
  //   vn: "Viet Nam",
  //   vg: "Virgin Islands, British",
  //   vi: "Virgin Islands, U.S.",
  //   wf: "Wallis and Futuna",
  //   eh: "Western Sahara",
  //   ye: "Yemen",
  //   zm: "Zambia",
  //   zw: "Zimbabwe",
  // };

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
    } else {
      setUnav(false);
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
    document.title = "GM Weather";

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
        <p className=" font-extralight text-4xl uppercase P-3 md:p-6 mt-2 md:mt-4 mb-2 mx-3 flex justify-start md:justify-between">
          <div className=" hidden md:flex"> आजको मौसम</div>
          <div className=" md:text-right"> Aajako Mausam</div>
        </p>
      </nav>
      <div className="container mx-auto flex-grow">
        <div className=" flex justify-center mb-2 md:mb-5">
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
                      {data?.name +
                        ", " +
                        countries[data?.sys?.country.toLowerCase()]}
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

          <div className="text-center mt-9 mb-3 md:mb-5 capitalize font-light text-2xl">
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
      <footer className="text-center font-light text-xl bg-blue-500 py-2 ">
        <p>Created without 💙 by Chin Chin</p>
      </footer>
    </div>
  );
}

export default App;
