import { Box, Divider, Typography } from "@mui/material";

export function SectionFormCard({title, children}){
    return(<Box sx={{mt: 3}}>
        <Divider sx={{mb: 3}}/>
        <Box sx={{
            display:"flex",
            padding:"0 10px"
        }}>
            <Typography fontSize="1rem" fontWeight="500" sx={{ width:"25%"}}>{title}</Typography>
            <Box sx={{display:"flex", flexDirection:"column", gap:"20px", width:"70%"}}>
                {children}
            </Box>
        </Box>
    </Box>);
}