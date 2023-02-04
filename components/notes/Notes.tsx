import { LinearProgress, Typography } from "@mui/material";

import { FC } from "react";
import { getNotes } from "../../api/note";

const Notes: FC = () => {
  const { isLoading, data } = getNotes();

  console.log(data);
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <main>
      {typeof data}
      {data?.length}
      {data?.map((note) => (
        <Typography>{note.id}</Typography>
      ))}
    </main>
  );
};

export default Notes;
