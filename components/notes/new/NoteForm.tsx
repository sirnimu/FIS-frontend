import "leaflet/dist/leaflet.css";

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React, { FC } from "react";

import { DateTimePicker } from "@mui/x-date-pickers";
import { Marker } from "react-leaflet";
import { Stack } from "@mui/system";
import { createNote } from "../../../api/note";
import { fishingMethodOptions } from "../../../options/note";
import { useFormik } from "formik";
import useMessage from "../../../hooks/useMessage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NoteForm: FC = () => {
  const fieldProps: TextFieldProps = {
    fullWidth: true,
    margin: "dense",
  };

  const { showError, showMessage } = useMessage();
  const navigate = useNavigate();

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onError: () => {
      showError("Failed to create fishing note");
    },
    onSuccess: (data, variables, context) => {
      showMessage("Fishing app created");
    },
  });

  const submitForm = async (values: any) => {
    {
      const body = {
        user: "test",
        startTime: values.startTime,
        endTime: values.endTime,
        coordinates: values.coordinates,
        waterBody: values.waterBody,
        fishingMethod: values.fishingMethod,
        fishCount: values.fishCount,
        bait: values.bait,
        note: values.description,
      };
      addNote(body);
      navigate(-1);
    }
  };

  const formik = useFormik({
    initialValues: {
      startTime: null,
      endTime: null,
      coordinates: { latitude: 54.6872, longitude: 25.2797 },
      waterBody: "",
      fishingMethod: "",
      fishCount: "",
      bait: "",
      description: "",
    },
    onSubmit: submitForm,
  });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        formik.setFieldValue("coordinates", {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });
    return <></>;
  };

  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Typography variant="h5" sx={{ p: 1 }}>
          Create new fishing
        </Typography>

        <DateTimePicker
          label="Started"
          ampm={false}
          value={formik.values.startTime}
          onChange={(newValue) => {
            formik.setFieldValue("startTime", newValue);
          }}
          renderInput={(params) => (
            <TextField id="startTime" required {...fieldProps} {...params} />
          )}
        />
        <DateTimePicker
          label="Finished"
          ampm={false}
          value={formik.values.endTime}
          onChange={(newValue) => {
            formik.setFieldValue("endTime", newValue);
          }}
          renderInput={(params) => (
            <TextField id="endTime" required {...fieldProps} {...params} />
          )}
        />
        <Box sx={{ width: "100%", my: 2 }}>
          <MapContainer
            center={[
              formik.values.coordinates.latitude,
              formik.values.coordinates.longitude,
            ]}
            zoom={10}
            style={{ height: 250, width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            <Marker
              position={[
                formik.values.coordinates.latitude,
                formik.values.coordinates.longitude,
              ]}
            />
          </MapContainer>
          <Grid
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={2}
            sx={{ width: "100%", mt: 2 }}
          >
            <TextField
              label="Latitude"
              value={formik.values.coordinates.latitude}
              disabled
              {...fieldProps}
            />
            <TextField
              label="Longitude"
              value={formik.values.coordinates.longitude}
              disabled
              {...fieldProps}
            />
          </Grid>
        </Box>
        <TextField
          id="waterBody"
          label="Water body"
          value={formik.values.waterBody}
          onChange={formik.handleChange}
          required
          {...fieldProps}
        />
        <TextField
          id="fishingMethod"
          label="Fishing method"
          value={formik.values.fishingMethod}
          onChange={(e) => {
            formik.setFieldValue("fishingMethod", e.target.value);
          }}
          select
          required
          {...fieldProps}
        >
          <MenuItem key={""} value={""}>
            No Selected
          </MenuItem>
          {fishingMethodOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="fishCount"
          label="Fish count"
          value={formik.values.fishCount}
          onChange={formik.handleChange}
          required
          {...fieldProps}
        />
        <TextField
          id="bait"
          label="Bait"
          value={formik.values.bait}
          onChange={formik.handleChange}
          {...fieldProps}
        />
        <TextField
          id="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          multiline
          {...fieldProps}
        />
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
          spacing={2}
          sx={{ width: "100%", py: 4 }}
        >
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NoteForm;
