import React, { useEffect, createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackData, setSnackData] = useState({
    message: "Sample toast",
    variant: "error",
  });

  const handleSnackOpen = (data) => {
    // error, warning, info, success
    setSnackData(data);
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  useEffect(() => {
    console.log("data changes for snack to ", snackData);
  }, [snackData]);

  return (
    <ToastContext.Provider value={{ handleSnackOpen }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleSnackClose}
      >
        <Alert
          variant="filled"
          onClose={handleSnackClose}
          severity={snackData.variant}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
