import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import React, { FC } from "react";

import { LatLngExpression } from "leaflet";

type Props = {
  position: LatLngExpression;
};

const Map: FC<Props> = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: 250, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
};

export default Map;
