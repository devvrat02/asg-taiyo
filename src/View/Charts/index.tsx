import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import {  prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { coviddata,countriesdata,countrydata } from "../../api";
import Loader from "../loader";

const Charts = () => {
  const [country, setInputCountry] = useState("worldwide");//setting country code 
  const [countryInfo, setCountryInfo] = useState({todayCases:0,cases:0,todayRecovered:0,recovered:0,todayDeaths:0,deaths:0});//covid default value
  const [countries, setCountries] = useState([]); //Countries list
  const [mapCountries, setMapCountries] = useState([]);//countries that going to show in map
  const [casesType, setCasesType] = useState("cases"); //Type of case
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]); //position of map changing the axis wrt to country
  const [mapZoom, setMapZoom] = useState(5); //zoom the map
  // query used for fetching the data worldwide covid data, countries list, country details 
  const {data: all_covid_data,isLoading:aload}:any=useQuery({queryKey: ['alldata'], queryFn:coviddata})
  const {data: countries_data,isLoading:bload}:any=useQuery({queryKey: ['countriesdata'], queryFn:countriesdata})
  const {data: country_data,isLoading:cload}:any=useQuery({queryKey: ['countrydata',country], queryFn:()=>countrydata(country)})
  const [loading,setload]=useState(false);//loader
  useEffect(()=>{
    setload(aload||bload||cload);
  },[aload,bload,cload])  //if any api is loading the loader will visible

  useEffect(() => {
    // modifying state for the map, and top cards
      const countries = countries_data?.map((country:any) => ({name: country.country,value: country.countryInfo.iso2}));
      setCountries(countries);
      setMapCountries(countries_data);
      setCountryInfo(country_data)
      if(country==='worldwide'||country==='all'){
        setCountryInfo(all_covid_data)
      }
      if(country_data?.countryInfo?.lat&& country_data?.countryInfo?.long){
        setMapCenter([country_data?.countryInfo?.lat, country_data?.countryInfo?.long]);
      }else{
        setMapCenter([34.80746, -50.4796]);
      }
  },[countries_data,country,all_covid_data,country_data])

  useEffect(()=>{
    // modifying state for the map, and top cards and setting country info
      setCountryInfo(country_data);
      if(country_data?.countryInfo?.lat&& country_data?.countryInfo?.long){
        setMapCenter([country_data?.countryInfo?.lat, country_data?.countryInfo?.long]);
      }else{
        setMapCenter([34.80746, -50.4796]);
      }
      setMapZoom(4);
      if(country==='worldwide'||country==='all'){
        setCountryInfo(all_covid_data)
      }
  },[all_covid_data,country_data,country])

// for dropdown value change
  const onCountryChange = async (e:any) => {
    const countryCode = e.target.value;
    setInputCountry(countryCode);
  };
  
  return (
    <div className="">
        {loading&&<Loader/>}
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID-19 Tracker</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries?.map((country:any) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              onClick={() => setCasesType("cases")}
              title="Coronavirus Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryInfo?.todayCases)}
              total={numeral(countryInfo?.cases).format("0.0a")}
            />
            <InfoBox
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo?.todayRecovered)}
              total={numeral(countryInfo?.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo?.todayDeaths)}
              total={numeral(countryInfo?.deaths).format("0.0a")}
            />
          </div>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      <div className="w-5/6 m-auto">
        <div className="h-auto w-full bg-white rounded-2xl p-4 shadow-sm m-auto">
          <LineGraph casesType={casesType} country={country} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
