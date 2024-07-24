import { useTheme } from "@emotion/react";
import { Container } from "@mui/material";

export function Register(){
    const theme = useTheme();

    return(
    <Container maxWidth="sm" sx={{backgroundColor: theme.palette.primary.main}}>
        <p>Hola</p>
    </Container>
    )
}