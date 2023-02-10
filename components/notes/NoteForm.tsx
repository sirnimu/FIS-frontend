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
import { createNote, editNote } from "../../api/note";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { DateTimePicker } from "@mui/x-date-pickers";
import { Marker } from "react-leaflet";
import { Stack } from "@mui/system";
import { fishingMethodOptions } from "../../options/note";
import { getUsers } from "../../api/user";
import { useFormik } from "formik";
import useMessage from "../../hooks/useMessage";

const fieldProps: TextFieldProps = {
  fullWidth: true,
  margin: "dense",
};

const NoteForm: FC = (props) => {
  const location = useLocation();
  const { state } = location;
  const { note } = state;

  const { showError, showMessage } = useMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onError: () => {
      showError("Failed to create note");
    },
    onSuccess: () => {
      navigate("/");
      showMessage("Note created");
      return queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const { mutate: putNote } = useMutation({
    mutationFn: editNote,
    onError: () => {
      showError("Failed to edit note");
    },
    onSuccess: () => {
      navigate("/");
      showMessage("Note created");
      return queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: () => {
      showError("Failed to load");
    },
  });

  const submitForm = async (values: any) => {
    {
      const body = {
        ...(note?.id && { id: note.id }),
        user: values.user,
        startTime: values.startTime,
        endTime: values.endTime,
        coordinates: values.coordinates,
        waterBody: values.waterBody,
        fishingMethod: values.fishingMethod,
        fishCount: values.fishCount,
        bait: values.bait,
        description: values.description,
        ...(values.temp && { temp: values.temp }),
        ...(values.windKph && { windKph: values.windKph }),
        ...(values.windDir && { windDir: values.windDir }),
        ...(values.cloudPct && { cloudPct: values.cloudPct }),
        ...(values.conditionText && { conditionText: values.conditionText }),
      };

      if (note?.id) {
        putNote(body);
      } else {
        addNote(body);
      }
    }
  };

  const formik = useFormik({
    initialValues: note
      ? {
          user: note.user,
          startTime: note.startTime,
          endTime: note.endTime,
          coordinates: note.coordinates,
          waterBody: note.waterBody,
          fishingMethod: note.fishingMethod,
          fishCount: note.fishCount,
          bait: note.bait,
          description: note.description,
          temp: note.temp,
          windKph: note.windKph,
          windDir: note.windDir,
          cloudPct: note.cloudPct,
          conditionText: note.conditionText,
        }
      : {
          user: "",
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

        <TextField
          id="user"
          label="User"
          value={formik.values.user}
          onChange={(e) => {
            formik.setFieldValue("user", e.target.value);
          }}
          select
          required
          SelectProps={{
            value: formik.values.user,
          }}
          {...fieldProps}
        >
          {users &&
            users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
        </TextField>

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
          SelectProps={{
            value: formik.values.fishingMethod,
          }}
          select
          required
          {...fieldProps}
        >
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
        {note?.id && (
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
              {...fieldProps}
            />
            <TextField
              id="windKph"
              label="Wind speed"
              value={formik.values.windKph}
              onChange={formik.handleChange}
              multiline
              {...fieldProps}
            />
            <TextField
              id="windDir"
              label="Wind direction"
              value={formik.values.windDir}
              onChange={formik.handleChange}
              multiline
              {...fieldProps}
            />
            <TextField
              id="cloudPct"
              label="Cloud percent"
              value={formik.values.cloudPct}
              onChange={formik.handleChange}
              multiline
              {...fieldProps}
            />
            <TextField
              id="conditionText"
              label="Weather condition"
              value={formik.values.conditionText}
              onChange={formik.handleChange}
              multiline
              {...fieldProps}
            />
          </>
        )}
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
