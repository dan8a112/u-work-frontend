import { Box, Typography } from "@mui/material";

export function ImageTextCard({url, text, mb}){
    return(
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: mb ? mb : "0"
        }}>
            <img src={url} style={{width: "40px", marginRight:"20px"}}/>
            <Typography sx={{fontWeight: "600"}} fontSize="1.2rem">{text}</Typography>
        </Box>
    );
}