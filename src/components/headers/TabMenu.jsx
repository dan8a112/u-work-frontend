import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function TabMenu({tabs, indexSelected, handleClick}){

    const [selected, setSelected] = useState(indexSelected || 0);

    useEffect(()=>{
        setSelected(indexSelected);
    }, [indexSelected])

    const styleDefault= {
        primary: "#757575",
        secondary: "#EEEEEE"
    }

    const styleSelected= {
        primary: "#0D9E82",
        secondary: "#F1FAF9"
    }

    return(
        <Box sx={{display:"flex", alignItems:"center", p:'20px', gap:"30px", mb:"20px"}}>
            {tabs.map((tab, index)=> (
            <Box sx={{display:"flex", alignItems:"center", cursor:"pointer"}} key={index} onClick={()=>{handleClick(index)}}>
                <Box sx={{mr:"10px"}}>
                <Typography color={index !== selected ? styleDefault.primary : styleSelected.primary} fontSize="1.25rem">{tab.title}</Typography>
                <Divider sx={{bgcolor: index !== selected ? styleDefault.primary : styleSelected.primary }}/>
                </Box>
                {
                    tab.amount && (
                    <Box sx={{width:"35px", height:"24px", bgcolor: index !== selected ? styleDefault.secondary : styleSelected.secondary, borderRadius:"3px", textAlign:"center"}}>
                    <Typography color={index !== selected ? styleDefault.primary : styleSelected.primary}>{tab.amount}</Typography>
                </Box>
                    )
                }
                
            </Box>
            )
            )}   
        </Box>
    )
}