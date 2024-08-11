import { Box, Typography } from "@mui/material";

export function ImageTextCard({url, text, mb, fz, fw}){
    return(
        <Box sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: mb ? mb : "0"
        }}>
            <img src={url} style={{width: "25px", height: "25px", marginRight:"20px"}}/>
            <Typography sx={{fontWeight: fw || "600"}} fontSize={{fz} || "1.2rem"}>{text}</Typography>
        </Box>
    );
}