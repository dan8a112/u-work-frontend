import {People} from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function FamiliaresCard({familiar, marginBottom}){

    const {nombre, identificacion, telefono, parentesco} = familiar;

    return (
        <Card sx={marginBottom && {mb: 3}}>
          <CardContent>
            <Grid container >
              <Grid item xs={1.5}>
              <People sx={{ width: 70, height: 70}}/>
              </Grid>
              <Grid item xs={10.5}>
                <Box>
                  <Typography sx={{fontWeight: "500", fontSize: "1.2em"}}>{nombre}</Typography>
                  <Typography sx={{fontSize: "1.05em"}}>Identificacion: {identificacion}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Telefono: {telefono}</Typography>
                  <Typography sx={{fontSize: "1.05em"}} color="text.secondary">Parentesco: {parentesco}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
}