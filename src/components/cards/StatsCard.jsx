import { Box, Typography } from "@mui/material";

export function StatsCard({text, children}){
    return (
      <Box
        sx={{
          display: "flex",
          height:"183px",
          width:"100%",
          flexDirection: "column",
          textAlign: "center",
          padding: "20px",
          backgroundColor:"#fff"
        }}
      >
        <Typography>{text}</Typography>
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100%"
          }}
        >{children}</Box>
      </Box>
    );
}