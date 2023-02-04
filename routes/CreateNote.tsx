import NoteForm from "../components/notes/new/NoteForm";
import Notes from "../components/notes/Notes";
import Page from "../components/ui/Page";
import React from "react";

const CreateNote = () => {
  return (
    <Page>
      <NoteForm />
    </Page>
  );
};

export default CreateNote;
