import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export function CandidateCard({candidato, navigate, idOffer}){

    const {id, urlPerfil, nombre, titular, lugarOrigen,formaciones} = candidato;

    return(
        <Card sx={{position:"relative", mb:"30px"}}>
            <CardContent>
               <Box sx={{display:"flex"}}>
                <img src={urlPerfil} alt="Perfil de usuario" style={{width: "45px", height:"45px", marginRight:"20px"}}/>
                <Box>
                    <Typography fontSize="20px" fontWeight="500">{nombre}</Typography>
                    <Typography fontSize="16px">{titular}</Typography>
                </Box>
               </Box>
               <Box sx={{display:"flex", justifyContent:"space-between", mt:3}}>
                    <Typography color="#757575">{lugarOrigen}</Typography>
                    <div>
                    <Typography sx={{display:"inline-block", mr:"10px", fontWeight:"500"}}>Formaciones</Typography>
                    <Typography sx={{display:"inline-block", color:"#0D9E82"}}>{formaciones.join(", ")}</Typography>
                    </div>
                </Box>
            </CardContent>
            <CardActions sx={{position:"absolute", top:"15px", right:"15px"}}>
                <Button variant="contained" sx={{bgcolor:"#0D669E"}} onClick={() => navigate(id, idOffer)}>Ver perfil</Button>
            </CardActions>
        </Card>
    )
}