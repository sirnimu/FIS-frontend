import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import { Link } from "react-router-dom";
import React from "react";
import { useCreateUser } from "../../api/user";

type FormValues = { username: string; password: string };

const SignUp = () => {
  const { createNewUser } = useCreateUser();

  const handleSubmit = (values: FormValues) => {
    createNewUser({
      userName: values.username,
      password: values.password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik<FormValues>
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                    label="Username"
                    name="username"
                    autoComplete="username"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
