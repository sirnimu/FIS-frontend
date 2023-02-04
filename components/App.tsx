import { FC } from "react";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "../contexts/ThemeProvider";
import QueryProvider from "../contexts/QueryProvider";
import Main from "./Main";

export const App: FC = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </QueryProvider>
  );
};
