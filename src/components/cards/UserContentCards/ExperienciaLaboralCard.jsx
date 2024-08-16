import {Work, WorkHistory, WorkOutline} from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function ExperienciaLaboralCard({experiencia}){

    const {puesto, empresa, fechaInicio, fechaFinal} = experiencia;

    return (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container >
              <Grid item xs={1.5} color="#382911">
              <WorkOutline sx={{ width: 70, height: 70}}/>
              </Grid>
              <Grid item xs={10.5}>
                <Box>
                  <Typography sx={{fontWeight: "500", fontSize: "1.2em"}}>{puesto}</Typography>
                  <Typography sx={{fontSize: "1.05em"}}>Empresa: {empresa}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Desde: {fechaInicio}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Hasta: {!fechaFinal ? 'Actualidad': fechaFinal}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
}