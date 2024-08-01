import {Language} from '@mui/icons-material';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';

export function IdiomasCards({idioma, marginBottom}){

    const {titulo, nivel} = idioma;

    return (
        <Card sx={marginBottom && {mb: 3}}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={1.5}  color='#ffc839'>
              <Language sx={{ width: 70, height: 70}}/>
              </Grid>
              <Grid item xs={10.5}>
                <Box>
                  <Typography sx={{fontWeight: "500", fontSize: "1.2em"}}>{titulo}</Typography>
                  <Typography sx={{fontSize: "1.05em"}}>Nivel: {nivel}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
}