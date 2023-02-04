import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

import { Note as NoteType } from "../../api/note";
import { Stack } from "@mui/system";
import ThermostatIcon from "@mui/icons-material/Thermostat";

type Props = {
  note: NoteType;
};

const Note: FC<Props> = ({ note }) => {
  return (
    <Card key={note.id} sx={{ minWidth: 250 }}>
      <CardHeader title={note.user} subheader={note.note} />
      <CardContent>
        <Grid display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <Typography>Start time:</Typography>
          <Typography> {note.startTime}</Typography>
          <Typography>End time:</Typography>
          <Typography> {note.endTime}</Typography>
          <Typography>Location</Typography>
          <Typography>
            {note.coordinates.latitude} {note.coordinates.longitude}
          </Typography>
          <Typography>Fishing Method</Typography>
          <Typography>{note.fishingMethod}</Typography>
          <Typography>Bait</Typography>
          <Typography>{note.bait}</Typography>
        </Grid>

        {note.temp && (
          <>
            <Stack justifyContent="flex-start" sx={{ mt: 2 }}>
              <ThermostatIcon color="primary" />
              <Typography fontWeight={700}>Weather:</Typography>
            </Stack>
            <Grid display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
              <Typography>Temperature</Typography>
              <Typography> {note.temp}</Typography>
              <Typography>windKph:</Typography>
              <Typography> {note.windKph}</Typography>
              <Typography>windDir</Typography>
              <Typography>{note.windDir}</Typography>
              <Typography>cloudPct</Typography>
              <Typography>{note.cloudPct}</Typography>
              <Typography>conditionText</Typography>
              <Typography>{note.conditionText}</Typography>
            </Grid>
          </>
        )}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Note;
