import React, { FC } from "react";
import { TextField, Typography } from "@mui/material";

import { useFormikContext } from "formik";

const WeatherFields: FC = () => {
  const formik = useFormikContext<any>();
  return (
    <>
      <Typography fontWeight={700} sx={{ mt: 2 }}>
        Weather
      </Typography>
      <TextField
        id="temp"
        label="Tempature"
        value={formik.values.temp}
        onChange={formik.handleChange}
        multiline
        margin="dense"
        fullWidth
      />
      <TextField
        id="windKph"
        label="Wind speed"
        value={formik.values.windKph}
        onChange={formik.handleChange}
        multiline
        margin="dense"
        fullWidth
      />
      <TextField
        id="windDir"
        label="Wind direction"
        value={formik.values.windDir}
        onChange={formik.handleChange}
        multiline
        margin="dense"
        fullWidth
      />
      <TextField
        id="cloudPct"
        label="Cloud percent"
        value={formik.values.cloudPct}
        onChange={formik.handleChange}
        multiline
        margin="dense"
        fullWidth
      />
      <TextField
        id="conditionText"
        label="Weather condition"
        value={formik.values.conditionText}
        onChange={formik.handleChange}
        multiline
        margin="dense"
        fullWidth
      />
    </>
  );
};

export default WeatherFields;
