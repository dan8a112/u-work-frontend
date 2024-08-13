import { Box, Typography } from "@mui/material";

export function ImageTextCard({url, text, mb, fz, fw, width, marginIcon}){
    return(
        <Box sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: mb ? mb : "0",
            width: width
        }}>
            <img src={url} style={{width: "25px", height: "25px", marginRight: marginIcon ? marginIcon : "20px"}}/>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                width: '100%'
            }}>
            <Typography sx={{fontWeight: fw || "600"}} fontSize={{fz} || "1.2rem"}>{text}</Typography>
            </Box>
        </Box>
    );
}