import { Button, Grid, LinearProgress, Stack } from "@mui/material";
import { FC, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import AddNoteDialog from "./AddNoteDialog";
import Note from "./Note";
import React from "react";
import { getNotes } from "../../api/note";
import { useQuery } from "@tanstack/react-query";

const Notes: FC = () => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  const { isLoading, data: notes } = useQuery(["notes"], getNotes);

  return (
    <>
      <Stack justifyContent="center" alignItems="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setIsAddNoteOpen(true)}>
          Add new
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid display="grid" gap={2}>
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Grid>
      )}
      <AddNoteDialog open={isAddNoteOpen} setOpen={setIsAddNoteOpen} />
    </>
  );
};

export default Notes;
