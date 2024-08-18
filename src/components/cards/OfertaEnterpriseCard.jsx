import { Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function OfertaEnterpriseCard({index, card, seeDetail}){

    const {titulo, descripcion, fechaPublicacion, src} = card;

    const navigate = useNavigate();
    const handleOnClick = (url) => {
        navigate(url)
    };

    return(
        <Box sx={{
            display:"flex",
            alignItems: "center",
        }}>
            <Typography variant="h4"  color="primary" sx={{mr: "20px", fontWeight:"550"}}>1</Typography>
            <Card variant="outlined" sx={{position:"relative", width: "100%"}}>
                <CardContent>
                    <Typography sx={{fontSize: "24px", fontWeight:"500", mb: "10px"}}>{titulo}</Typography>
                    <Typography>{descripcion}</Typography>
                    <Box sx={{ display:"flex", justifyContent:"end", mt:"10px"}}>
                        <Typography color="#49454F">{fechaPublicacion}</Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{position: "absolute", top:'5px', right:"5px"}}>
                    <Button onClick={() =>{handleOnClick(src)}}>Ver mas</Button>
                </CardActions>
            </Card>
        </Box>
    );
}