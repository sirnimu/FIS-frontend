import { Button, LinearProgress, Stack } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FC } from "react";
import Note from "./Note";
import React from "react";
import { getNotes } from "../../api/note";
import { getUsers } from "../../api/user";
import useMessage from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Notes: FC = () => {
  const { showError } = useMessage();
  const { isLoading, data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    onError: () => {
      showError("Failed to load");
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            navigate("/new");
          }}
        >
          Create
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
