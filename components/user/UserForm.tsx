import { Button, Card, Stack, TextField } from "@mui/material";

import { Container } from "@mui/system";
import React from "react";
import { createUser } from "../../api/user";
import { useFormik } from "formik";
import useMessage from "../../utils/useMessage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { showError, showMessage } = useMessage();
  const navigate = useNavigate();

  const { mutate: createNewUser } = useMutation({
    mutationFn: createUser,
    onError: () => {
      showError("Failed to create user");
    },
    onSuccess: () => {
      navigate("/");
      showMessage("User created");
    },
  });

  const submitForm = async (values: any) => {
    const body = {
      userName: values.userName,
      password: values.password,
    };
    createNewUser(body);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: submitForm,
  });

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4 }}>
        <Stack direction="column" spacing={2}>
          <TextField
            id="userName"
            label="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Create user
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default UserForm;
