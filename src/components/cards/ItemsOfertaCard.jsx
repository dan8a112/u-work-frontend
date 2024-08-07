import { Box, Typography } from "@mui/material";

const styles = {
    p:'8px 25px', 
    backgroundColor:"#0D9E82",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "500"
}

const stylesParent = {
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius: "8px",
    color: "#49454F",
    fontWeight: "500"
}

export function ItemsOfertaCard({itemName}){
    return (
      <Box sx={styles} display="flex" alignItems="center">
        {itemName}
      </Box>
    );
}

export function ItemsOfertaDual({itemName, detail}){
    return (
      <Box sx={stylesParent}>
        <Box sx={styles} display="flex" alignItems="center">
          {itemName}
        </Box>
        <Box sx={{p:"8px 25px"}}>
            <Typography>{detail}</Typography>
        </Box>
      </Box>
    );
}