import { Marker, useMapEvents } from "react-leaflet";

import L from "leaflet";
import React from "react";
import { useFormikContext } from "formik";

const LocationMarker = () => {
  const formik = useFormikContext<any>();

  useMapEvents({
    click(e) {
      formik.setFieldValue("latitude", e.latlng.lat);
      formik.setFieldValue("longitude", e.latlng.lng);
    },
  });

  const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Marker
      position={[formik.values.latitude, formik.values.longitude]}
      icon={icon}
    />
  );
};

export default LocationMarker;
