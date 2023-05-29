import React, { useState, useEffect } from "react";
import {Line} from "react-chartjs-2";
import numeral from "numeral";
import { useQuery } from "@tanstack/react-query";
import { countryhistory } from "../../api";
import Loader from "../loader";
// setting up properties for graph 
const options = {
  responsive: true,
  legend: {
    display: true,
    position: 'top' as const,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem:any) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        
        ticks: {
          beginAtZero: true,
          callback: function (value:any) {return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

// sorting /arranging the covid data 
const buildChartData = (data:any, casesType:any) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data?.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType,country }:any) {
  const [data, setData] = useState([]);// for cases
  const [data1, setData1] = useState([]);// for recovered
  const [data2, setData2] = useState([]);// for deaths
  // react query fetching the data 
  const {data: country_dt,isLoading:load}:any=useQuery({queryKey: ['countrygraph',country], queryFn:()=>countryhistory(country)})

  useEffect(() => {
    // on data change modifying the data according to requirement
    // console.log(country_dt)
          if(country==='worldwide'&&country_dt){
            let chartData:any = buildChartData(country_dt, `cases`);
            let chartData1:any = buildChartData(country_dt, `recovered`);
            let chartData2:any = buildChartData(country_dt, `deaths`);
            setData(chartData);
            setData1(chartData1)
            setData2(chartData2)
          }
          else{
            let chartData:any = buildChartData(country_dt?.timeline, `cases`);
            let chartData1:any = buildChartData(country_dt?.timeline, `recovered`);
            let chartData2:any = buildChartData(country_dt?.timeline, `deaths`);
            setData(chartData);
            setData1(chartData1)
            setData2(chartData2)
          }
  }, [country,country_dt]);

  return (
    <div>
        <div className="">
          {load&&<Loader/>}
        </div>
      {data?.length > 0 && (
        <Line
          type={`bar`}
          data={{
            datasets: [
              {
                label: 'Coronavirus Cases',
                type: 'line' as const,
                backgroundColor: "#CC1034",
                borderColor: "#CC1034",
                data: data,
              },
              {
                label: 'Recovered',
                type: 'line' as const,
                backgroundColor: "#7DD71D",
                borderColor: "#7DD71D",
                data: data1,
              },
              {
                label: 'Deaths',
                type: 'line' as const,
                backgroundColor: "#FB4443",
                borderColor: "#FB4443",
                data: data2,
              },
            ],
            
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
