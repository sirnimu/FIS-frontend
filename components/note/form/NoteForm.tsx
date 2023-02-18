import "leaflet/dist/leaflet.css";

import {
  Button,
  Container,
  LinearProgress,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import {
  FishingMethod,
  Note,
  createNote,
  editNote,
  getNote,
} from "../../../api/note";
import React, { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { DateTimePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import LocationFields from "./LocationFields";
import { Stack } from "@mui/system";
import WeatherFields from "./WeatherFields";
import { fishingMethodOptions } from "../../../options/note";
import { getUsers } from "../../../api/user";
import moment from "moment";
import useMessage from "../../../utils/useMessage";

const fieldProps: TextFieldProps = {
  fullWidth: true,
  margin: "dense",
};

type NoteFormValues = {
  user: string;
  startTime: string | null;
  endTime: string | null;
  latitude: number;
  longitude: number;
  waterBody: string;
  fishingMethod: FishingMethod | "";
  fishCount: number;
  bait: string;
  description: string;
  temp?: string;
  windKph?: string;
  windDir?: string;
  cloudPct?: string;
  conditionText?: string;
};

const NoteForm: FC = () => {
  let { noteId } = useParams();

  const { showError, showMessage } = useMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: note } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNote(Number(noteId)),
    onError: () => {
      showError("Failed to load note data");
    },
    enabled: !!noteId,
  });

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
      showError("Failed update note");
    },
    onSuccess: () => {
      navigate("/");
      showMessage("Note updated");
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

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  };

  const submitForm = async (values: any) => {
    const body = {
      ...(note?.id && { id: note.id }),
      user: values.user,
      startTime: values.startTime,
      endTime: values.endTime,
      coordinates: { latitude: values.latitude, longitude: values.longitude },
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
  };

  const getInitialValues = (note?: Note): NoteFormValues => {
    if (note?.id) {
      return {
        user: note.user,
        startTime: note.startTime,
        endTime: note.endTime,
        latitude: note.coordinates.latitude,
        longitude: note.coordinates.longitude,
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
      };
    } else {
      return {
        user: "",
        startTime: null,
        endTime: null,
        latitude: 54.6872,
        longitude: 25.2797,
        waterBody: "",
        fishingMethod: "",
        fishCount: 0,
        bait: "",
        description: "",
        temp: "",
        windKph: "",
        windDir: "",
        cloudPct: "",
        conditionText: "",
      };
    }
  };

  if (!users || (noteId && !note)) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Formik<NoteFormValues>
          initialValues={getInitialValues(note)}
          onSubmit={submitForm}
        >
          {({ values, setFieldValue, handleChange, handleSubmit }) => (
            <>
              <Typography variant="h5" sx={{ p: 1 }}>
                {noteId ? "Edit fishing notes" : "Create new fishing"}
              </Typography>

              <TextField
                id="user"
                label="User"
                value={values.user}
                onChange={(e) => {
                  setFieldValue("user", e.target.value);
                }}
                select
                required
                SelectProps={{
                  value: values.user,
                }}
                {...fieldProps}
              >
                {users &&
                  users.map((user) => (
                    <MenuItem key={user.userName} value={user.userName}>
                      {user.userName}
                    </MenuItem>
                  ))}
              </TextField>

              <DateTimePicker
                label="Started"
                ampm={false}
                value={values.startTime}
                onChange={(newValue) => {
                  setFieldValue("startTime", formatDate(newValue));
                }}
                renderInput={(params) => (
                  <TextField
                    id="startTime"
                    required
                    {...fieldProps}
                    {...params}
                  />
                )}
              />
              <DateTimePicker
                label="Finished"
                ampm={false}
                value={values.endTime}
                onChange={(newValue) => {
                  setFieldValue("endTime", formatDate(newValue));
                }}
                renderInput={(params) => (
                  <TextField
                    id="endTime"
                    onChange={handleChange}
                    required
                    {...fieldProps}
                    {...params}
                  />
                )}
              />
              <LocationFields />
              <TextField
                id="waterBody"
                label="Water body"
                value={values.waterBody}
                onChange={handleChange}
                required
                {...fieldProps}
              />
              <TextField
                id="fishingMethod"
                label="Fishing method"
                value={values.fishingMethod}
                onChange={(e) => {
                  setFieldValue("fishingMethod", e.target.value);
                }}
                SelectProps={{
                  value: values.fishingMethod,
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
                value={values.fishCount}
                onChange={handleChange}
                required
                {...fieldProps}
              />
              <TextField
                id="bait"
                label="Bait"
                value={values.bait}
                onChange={handleChange}
                {...fieldProps}
              />
              <TextField
                id="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                multiline
                {...fieldProps}
              />
              {noteId && <WeatherFields />}
              <Stack
                alignItems="flex-end"
                justifyContent="flex-end"
                spacing={2}
                sx={{ width: "100%", py: 4 }}
              >
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Save
                </Button>
              </Stack>
            </>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default NoteForm;
