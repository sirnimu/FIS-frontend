import { Button, LinearProgress, Stack } from "@mui/material";

import { FC } from "react";
import Note from "./Note";
import React from "react";
import { getNotes } from "../../api/note";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Notes: FC = () => {
  const { isLoading, data: notes } = useQuery(["notes"], getNotes);
  const navigate = useNavigate();

  return (
    <>
      <Stack justifyContent="center" alignItems="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/new");
          }}
        >
          Add new
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Stack direction="column" spacing={2}>
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Notes;
