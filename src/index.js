import "./theme-bootstrap.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0c3f5a"
    },
    secondary: blue
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById("root")
);
