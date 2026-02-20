import { createTheme } from "@mui/material/styles";
import {
  purple,
  yellow,
  blueGrey,
  blue,
  deepPurple,
} from "@mui/material/colors";
import "./App.css";

export const darkTheme = createTheme({
  typography: {
    fontFamily: '"El_Messiri", sans-serif',
  },
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
    background: {
      default: blueGrey[900],
      paper: blueGrey[800],
    },
    primary: {
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      main: yellow["A700"],
    },
    tertiary: {
      main: blueGrey[700],
      dark: blueGrey[800],
    },
    quaternary: {
      main: blue[50],
    },
    productsTableColors: {
      bg: deepPurple[500],
      cellbg: blueGrey[900],
      color: yellow[600],
      border: yellow[200],
    },
    wh: {
      main: "#ffffff",
    },
  },
});

export const lightTheme = createTheme({
  typography: {
    fontFamily: '"El_Messiri", sans-serif',
  },
  palette: {
    mode: "light",
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    background: {
      default: blue[50],
      paper: blue[50],
    },
    primary: {
      main: purple[900],
      dark: purple[800],
    },
    secondary: {
      main: yellow["A700"],
    },
    tertiary: {
      main: blueGrey[600],
      dark: blueGrey[700],
    },
    quaternary: {
      main: blue[100],
    },
    productsTableColors: {
      bg: purple[800],
      cellbg: blue[50],
      color: yellow[800],
      border: yellow[100],
    },
    wh: {
      main: "#ffffff",
    },
  },
});
