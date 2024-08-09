import { Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export function OfertaEnterpriseCard({index,card}){
    return(
        <Box sx={{
            display:"flex",
            alignItems: "center"
        }}>
            <Typography variant="h4"  color="primary" sx={{mr: "20px", fontWeight:"550"}}>1</Typography>
            <Card variant="outlined" sx={{position:"relative"}}>
                <CardContent>
                    <Typography sx={{fontSize: "24px", fontWeight:"500", mb: "10px"}}>Ejecutivo de ventas</Typography>
                    <Typography>La estudiante, en forma obligatoria, dará a conocer a la Institución sus necesidades de horarios de asignaturas o experiencias educativas.</Typography>
                    <Box sx={{ display:"flex", justifyContent:"end", mt:"10px"}}>
                        <Typography color="#49454F">24 Jun, 2043</Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{position: "absolute", top:'5px', right:"5px"}}>
                    <Button>Ver mas</Button>
                </CardActions>
            </Card>
        </Box>
    );
}