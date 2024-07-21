import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  // components: {
  //   // Apply global styles to CssBaseline
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       html, body {
  //         margin: 0;
  //         padding: 0;
  //         height: 100%;
  //         overflow: hidden; /* Prevent scrolling on the body */
  //       }
  //       #root {
  //         height: 100%; /* Ensure root element takes full height */
  //       }
  //     `,
  //   },
  //   // You can also apply styles to other MUI components here
  // },
});

export default theme;
