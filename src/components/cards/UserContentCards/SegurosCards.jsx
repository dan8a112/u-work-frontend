import { HealthAndSafety} from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function SegurosCards({seguro, marginBottom}){

    const {titulo, fechaAfiliacion, fechaExpiracion, numeroAfiliacion} = seguro;

    return (
        <Card sx={marginBottom && {mb: 3}}>
          <CardContent>
            <Grid container >
              <Grid item xs={1.5} color="#ffaa7b">
              <HealthAndSafety sx={{ width: 70, height: 70}}/>
              </Grid>
              <Grid item xs={10.5}>
                <Box>
                  <Typography sx={{fontWeight: "500", fontSize: "1.2em"}}>{titulo}</Typography>
                  <Typography sx={{fontSize: "1.05em"}}>Numero: {numeroAfiliacion}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Afiliacion: {fechaAfiliacion}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Expiracion: {fechaExpiracion}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
}