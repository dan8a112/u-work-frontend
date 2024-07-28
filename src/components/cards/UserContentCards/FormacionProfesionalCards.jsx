import { School } from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function FormacionProfesionalCard({formacion, marginBottom}){

    const {titulo, empresa, fechaExpedicion, nivelAcademico} = formacion;

    return (
      <Card sx={marginBottom && {mb: 3}}>
        <CardContent>
          <Grid container marginBottom="10px">
            <Grid item xs={1.5}>
            <School sx={{ width: 70, height: 70}}/>
            </Grid>
            <Grid item xs={10.5}>
              <Box>
                <Typography sx={{fontWeight: "600", fontSize: "1.2em"}}>{titulo}</Typography>
                <Typography sx={{fontSize: "1.05em"}}>{empresa}</Typography>
                <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Expedicion: {fechaExpedicion}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography sx={{fontSize: "1.05em"}} color="primary">Nivel Academico: {nivelAcademico}</Typography>
        </CardContent>
      </Card>
    );
}