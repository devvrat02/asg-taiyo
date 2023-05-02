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
  return (
    <div className="map">
      <LeafletMap>
       <ChangeView center={center} zoom={zoom} /> 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
