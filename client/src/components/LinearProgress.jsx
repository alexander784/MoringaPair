import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// loading component
export default function LinearColor() {
  return (
    <Stack sx={{ width: "100%", color: "grey.500", mt: "15%" }} spacing={2}>
      <LinearProgress color="warning" />
      <LinearProgress color="primary" />
      <LinearProgress color="success" />
    </Stack>
  );
}
