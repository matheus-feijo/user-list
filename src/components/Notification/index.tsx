import { Alert, Snackbar } from "@mui/material";
import { ReactNode } from "react";

interface INotificationProps {
  type: "success" | "error" | "info";
  isOpen: boolean;
  onClose: () => void;
  message: ReactNode;
}

export function Notification({
  type,
  isOpen,
  onClose,
  message,
}: INotificationProps) {
  const handleCloseNotificationSuccess = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleCloseNotificationSuccess}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleCloseNotificationSuccess}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
