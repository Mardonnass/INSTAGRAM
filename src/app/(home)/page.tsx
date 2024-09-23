//src/app/(home)/page.tsx
import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = {title: "Domov | Insta"}

export default function Home() {
    return(
        <Container>
            <Typography> Domovska stranka </Typography>
        </Container>
    );
}
