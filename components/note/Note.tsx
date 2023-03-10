import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Note as NoteType, deleteNote } from "../../api/note";
import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AvatarGenerator } from "random-avatar-generator";
import Map from "../Map";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fishingMethodOptions } from "../../options/note";
import moment from "moment";
import { red } from "@mui/material/colors";
import useMessage from "../../utils/useMessage";
import { useNavigate } from "react-router-dom";

type Props = {
  note: NoteType;
};

const Note: FC<Props> = ({ note }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { showError, showMessage } = useMessage();

  const { mutate: removeNote } = useMutation({
    mutationFn: deleteNote,
    onError: () => {
      showError("Failed to delete note");
    },
    onSuccess: () => {
      showMessage("Note deleted");
      return queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleOpenActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeActions = () => {
    setAnchorEl(null);
  };

  const generator = new AvatarGenerator();

  const handleDeleteNote = () => {
    removeNote(note.id);
    closeActions();
  };

  const handleEditNote = () => {
    navigate(`note/${note.id}`);
  };

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
        avatar={<Avatar src={generator.generateRandomAvatar(note.user)} />}
        title={note.user}
        titleTypographyProps={{ fontSize: 16 }}
        subheader={moment(note.endTime).fromNow()}
        subheaderTypographyProps={{ fontSize: 14 }}
        action={
          <IconButton onClick={handleOpenActions}>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{ "&.MuiCardHeader-root": { pb: 0 } }}
      />
      <CardContent>
        {note.description && (
          <Box sx={{ my: 2 }}>
            <Typography fontWeight={700}>Description:</Typography>
            <Typography>{note.description}</Typography>
          </Box>
        )}

        <Typography fontWeight={700}>General:</Typography>
        <Grid display="grid" gridTemplateColumns="1fr 1fr">
          <Typography>Fishes caught</Typography>
          <Typography>{note.fishCount}</Typography>
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
              <Typography fontWeight={700} gridColumn="span 2">
                Weather:
              </Typography>
              {note.conditionText && (
                <Typography gridColumn="span 2">
                  {note.conditionText}
                </Typography>
              )}
              {note.temp && (
                <>
                  <Typography>Temperature</Typography>
                  <Typography> {`${note.temp}??C`}</Typography>
                </>
              )}
              {note.windKph && (
                <>
                  <Typography>Wind speed</Typography>
                  <Typography>{`${Math.round(
                    Number(note.windKph) / 3.6
                  )} m/s`}</Typography>
                </>
              )}
              {note.windDir && (
                <>
                  <Typography>Wind direction</Typography>
                  <Typography>{note.windDir}</Typography>
                </>
              )}
              {note.cloudPct && (
                <>
                  <Typography>Cloudiness</Typography>
                  <Typography>{`${note.cloudPct}%`}</Typography>
                </>
              )}
            </Grid>
          </Box>
        )}

        {/* {note.temp && (
          <Box sx={{ mt: 2 }}>
            <Typography fontWeight={700} gridColumn="span 2">
              Weather:
            </Typography>
            <Stack justifyContent="flex-start" spacing={1}>
              <WbSunnyIcon fontSize="large" />
              <Typography variant="h4"> {`${note.temp}??C`}</Typography>
              <Stack direction="column" alignItems="flex-start">
                <Typography variant="body2">
                  {`Wind: ${note.windKph} km/h`}
                </Typography>
                <Typography variant="body2">{`Wind: ${note.windDir}`}</Typography>
                <Typography variant="body2">{`Cloudiness:${note.cloudPct}%`}</Typography>
              </Stack>
            </Stack>
          </Box>
        )} */}

        {note.coordinates.latitude && note.coordinates.longitude && (
          <Box sx={{ mt: 2 }}>
            <Map
              position={[note.coordinates.latitude, note.coordinates.longitude]}
            />
          </Box>
        )}
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeActions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEditNote}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteNote} sx={{ color: red[700] }}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Note;
