import React from "react";
import { MapContainer as LeafletMap, TileLayer,useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";


function ChangeView({ center, zoom }:any) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }:any) {
  // Leaflet map 
  return (
    <div className="map">
      <LeafletMap>
       <ChangeView center={center} zoom={zoom} /> 
       {/* tile layer user for showing map */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* showdataonmap use for circle and popup data */}
        {showDataOnMap(countries, casesType,casesType==='cases'?`#CC1034`:casesType==='recovered'?`#7DD71D`:`#FB4443`)}
      </LeafletMap>
    </div>
  );
}

export default Map;
