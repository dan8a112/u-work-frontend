import { useTheme } from "@emotion/react";
import DenseAppBar from "../headers/DenseAppBar";
import LoginCard from "../cards/LoginCard";
import ResponsiveAppBar from "../headers/HeaderHome";
import { Container } from "@mui/material";

export function Home(){
    const theme = useTheme();

    return(
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container maxWidth="sm" sx={{backgroundColor:"red"}}>Holaaa</Container>
            
        </div>
        
    )
}