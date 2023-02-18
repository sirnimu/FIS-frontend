import { Box, Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { FC } from "react";

import LocationMarker from "./LocationMarker";
import { useFormikContext } from "formik";

const LocationFields: FC = () => {
  const formik = useFormikContext<any>();

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <MapContainer
        center={[formik.values.latitude, formik.values.longitude]}
        zoom={10}
        style={{ height: 250, width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      <Grid
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={2}
        sx={{ width: "100%", mt: 2 }}
      >
        <TextField
          id="latitude"
          label="Latitude"
          value={formik.values.latitude}
          onChange={formik.handleChange}
          margin="dense"
          fullWidth
        />
        <TextField
          id="longitude"
          label="Longitude"
          value={formik.values.longitude}
          onChange={formik.handleChange}
          margin="dense"
          fullWidth
        />
      </Grid>
    </Box>
  );
};

export default LocationFields;
