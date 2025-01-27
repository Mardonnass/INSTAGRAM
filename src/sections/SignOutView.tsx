
// src/sections/SignOutView.tsx

"use client";

"use client";

import { signOut } from "next-auth/react";
import { Button, Container, Typography } from "@mui/material";
import { useTheme } from "next-themes";

export default function SignOutView() {
  const { theme } = useTheme();

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: theme === "dark" ? "#333" : "background.paper", // Adjust background color based on theme
        color: theme === "dark" ? "#fff" : "#000", // Adjust text color based on theme
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Naozaj sa chcete odhlásiť?
      </Typography>
      <Button
        variant="contained"
        onClick={() => signOut()}
        sx={{
          bgcolor: theme === "dark" ? "#1976d2" : "#1976d2", // Button color, consistent for both themes
          "&:hover": {
            bgcolor: theme === "dark" ? "#1565c0" : "#1565c0", // Hover effect, consistent for both themes
          },
        }}
      >
        Odhlásiť sa
      </Button>
    </Container>
  );
}

