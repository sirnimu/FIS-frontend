import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { green, red } from "@mui/material/colors";

import CloseIcon from "@mui/icons-material/Close";
import Map from "../Map";
import { Note as NoteType } from "../../api/note";
import SetMealIcon from "@mui/icons-material/SetMeal";
import { fishingMethodOptions } from "../../options/note";
import moment from "moment";

type Props = {
  note: NoteType;
};

const Note: FC<Props> = ({ note }) => {
  const getFishingMethodLabel = (fishingMethod: NoteType["fishingMethod"]) => {
    if (Number(fishingMethod)) {
      return (
        fishingMethodOptions.find((option) => option?.id === fishingMethod)
          ?.label ?? ""
      );
    } else {
      return fishingMethod;
    }
  };

  return (
    <Card key={note.id} sx={{ width: "100%", maxWidth: 500 }}>
      <CardHeader
        title={note.user}
        subheader={note.note}
        action={<Chip label={moment(note.endTime).fromNow()} />}
      />
      <CardContent>
        <Grid display="grid" gridTemplateColumns="1fr 1fr">
          <Typography>Fishes caught</Typography>
          <Typography>
            {note.fishCount > 0 ? (
              Array(note.fishCount)
                .fill(null)
                .map(() => <SetMealIcon sx={{ color: green[500] }} />)
            ) : (
              <CloseIcon sx={{ color: red[500] }} />
            )}
          </Typography>
          <Typography>Duration</Typography>
          <Typography>
            {moment
              .duration(moment(note.endTime).diff(note.startTime))
              .humanize()}
          </Typography>
          <Typography>Fishing Method</Typography>
          <Typography>{getFishingMethodLabel(note.fishingMethod)}</Typography>
          {note.bait && (
            <>
              <Typography>Bait</Typography>
              <Typography>{note.bait}</Typography>
            </>
          )}
        </Grid>

        {note.temp && (
          <Box sx={{ mt: 2 }}>
            <Grid display="grid" gridTemplateColumns="1fr 1fr">
              <Typography fontWeight={700}>Weather:</Typography>
              <Typography fontWeight={700}>{note.conditionText}</Typography>
              <Typography>Temperature</Typography>
              <Typography> {`${note.temp}°C`}</Typography>
              <Typography>Wind speed</Typography>
              <Typography> {`${note.windKph} km/h`}</Typography>
              <Typography>Wind direction</Typography>
              <Typography>{note.windDir}</Typography>
              <Typography>Cloudiness</Typography>
              <Typography>{`${note.cloudPct}%`}</Typography>
            </Grid>
          </Box>
        )}

        {note.coordinates.latitude && note.coordinates.longitude && (
          <Box sx={{ mt: 2 }}>
            <Map
              position={[note.coordinates.latitude, note.coordinates.longitude]}
            />
          </Box>
        )}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default Note;
