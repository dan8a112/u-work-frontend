import { MonitorHeart } from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function CondicionMedicaCards({condicionMedica, marginBottom}){

    const {titulo, descripcion} = condicionMedica;

    return (
      <Card sx={marginBottom && {mb: 3}}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={1.5} color="#005040">
              <MonitorHeart sx={{ width: 70, height: 70}} />
            </Grid>
            <Grid item xs={10.5}>
              <Box>
                <Typography sx={{fontWeight: "500", fontSize: "1.2em"}}>{titulo}</Typography>
                <Typography sx={{fontSize: "1.05em"}} color="text.secondary">{descripcion}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}