import { Box } from "@mui/material"

const styles = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    marginRight: '-20px'
}

export function ImageTrain({images}){
    return(
        <Box sx={{display:"inline-block", mr: "30px"}} >
            {images.map((value, index)=>
        <img src={value} key={index} style={styles}/>)}
        </Box>
        
    )
}