

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = { title: "Domov | ZoskaSnap" };

export default function NoAuthHome() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Vitajte do ZoskaSnap, prihlaste sa ku nám.
      </Typography>
    </Container>
  );
}