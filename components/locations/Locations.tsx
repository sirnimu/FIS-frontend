import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";
import { LatLngExpression } from "leaflet";
import { LinearProgress } from "@mui/material";
import React from "react";
import { getNotes } from "../../api/note";
import { useQuery } from "@tanstack/react-query";

const Locations = () => {
  const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const { isLoading, data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const defaultPosition: LatLngExpression = {
    lat: 54.6872,
    lng: 25.2797,
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <MapContainer
      center={defaultPosition}
      zoom={8}
      style={{ height: "calc(100vh - 96px)", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {notes?.map((note) => (
        <Marker
          position={{
            lat: note.coordinates.latitude,
            lng: note.coordinates.longitude,
          }}
          icon={icon}
        >
          <Popup>{note.user}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Locations;
