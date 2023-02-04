import "leaflet/dist/leaflet.css";

import {
  Button,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { Stack } from "@mui/system";
import { createNote } from "../../api/note";
import { fishingMethodOptions } from "../../options/note";
import moment from "moment";
import { useFormik } from "formik";
import useMessage from "../../hooks/useMessage";
import { useMutation } from "@tanstack/react-query";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<Props["open"]>>;
};

const AddNoteDialog: FC<Props> = ({ open, setOpen }) => {
  const fieldProps: TextFieldProps = {
    fullWidth: true,
    margin: "dense",
  };

  const { showError, showMessage } = useMessage();

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onError: () => {
      showError("Failed to create fishing note");
    },
    onSuccess: (data, variables, context) => {
      showMessage("Fishing app created");
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

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

      handleClose();
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Stack direction="column" sx={{ py: 2, px: 4 }}>
        <Typography variant="h5" sx={{ p: 1 }}>
          Create new fishing
        </Typography>
        <Grid
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap={2}
          sx={{ width: "100%" }}
        >
          <DateTimePicker
            ampm={false}
            value={formik.values.startTime}
            onChange={(newValue) => {
              formik.setFieldValue("startTime", newValue);
            }}
            renderInput={(params) => (
              <TextField
                id="startTime"
                label="Fishing start time"
                required
                {...fieldProps}
                {...params}
              />
            )}
          />
          <DateTimePicker
            ampm={false}
            value={formik.values.endTime}
            onChange={(newValue) => {
              formik.setFieldValue("endTime", newValue);
            }}
            renderInput={(params) => (
              <TextField
                id="endTime"
                label="Fishing end time"
                required
                {...fieldProps}
                {...params}
              />
            )}
          />
        </Grid>

        <MapContainer
          center={[54.6872, 25.2797]}
          zoom={10}
          style={{ height: 250, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents />
        </MapContainer>
        <Typography>{`Latitude: ${formik.values.coordinates.latitude}, Longitude: ${formik.values.coordinates.longitude}`}</Typography>
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
          {...fieldProps}
        />
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
          spacing={2}
          sx={{ width: "100%", py: 4 }}
        >
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddNoteDialog;
