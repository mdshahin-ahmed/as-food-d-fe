import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import App from "./App.jsx";
import { AppProviders } from "./context/app/index.jsx";
import "./index.css";
import "./styles/global-styles";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  </StrictMode>
);
