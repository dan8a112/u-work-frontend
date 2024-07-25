import { useTheme } from "@emotion/react";
import DenseAppBar from "../headers/DenseAppBar";
import LoginCard from "../cards/LoginCard";

export function Login(){
    const theme = useTheme();

    return(
        <div>
            <DenseAppBar></DenseAppBar>
            <LoginCard></LoginCard>
        </div>
        
    )
}