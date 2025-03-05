import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@pigment-css/react/styles.css";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider theme={darkTheme}>
      <App />
    </AppProvider>
  </StrictMode>,
);
