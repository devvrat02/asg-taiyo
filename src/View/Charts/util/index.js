import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
// setting the type and there colors for map and graph
export const caseTypeColors = {
    cases:{
        hex: "#CC1034",
        rgb: "rgb(204,16,52)",
        half_op: "rgba(204,16,52,0.5)",
        multiplier: 80,
    },
    recovered:{
        hex: "#7DD71D",
        rgb: "rgb(125,215,29)",
        half_op: "rgba(125,215,29,0.5)",
        multiplier: 20,
    },
    deaths:{
        hex: "#FB4443",
        rgb: "rgb(251,68,67)",
        half_op: "rgba(251,68,67,0.5)",
        multiplier: 20,
    },
};
// sorting the data
export const sortData = (data) => {
    if(!data){return []}

    const sortedData = [...data];

    return sortedData.sort((a, b)=> (a.cases>b.cases ? -1 : 1));
};

// show the new cases added count pretty means formating the txt
export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";



// Draw circles on MAP with interactive tooltip 
export const showDataOnMap = (data, casesType,color)=>{
    return data?.map((country) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                // color={color}
                // fillColor={color}
                fillOpacity={0.4}
                radius={Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier}
                >
                <Popup>
                    <div className="info-container">
                        <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        )

     )
    }
    
    
   
