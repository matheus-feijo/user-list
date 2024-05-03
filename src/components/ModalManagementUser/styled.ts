import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const styleModal: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  Height: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  display: "flex",
  flexDirection: "column",
  gap: 5,
};
