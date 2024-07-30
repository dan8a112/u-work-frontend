import {Card, CardContent, Typography, Button, CardActions} from '@mui/material';


export function UserInfoCard({phoneNumber, email, birthdate}) {
  return (
    <Card sx={{ width: "100%", bgcolor: "#F1FAF9", padding: 3, height: 380, boxShadow: "none"}}>
      <CardContent>
        <Typography sx={{fontWeight: "600", mb: 2}} variant="h6">Información General</Typography>
        <Typography variant="body1" component="div" sx={{fontWeight: "600"}}>
            Telefono
        </Typography>
        <Typography sx={{mb: 2}}>
            {phoneNumber}
        </Typography>
        <Typography variant="body1" component="div" sx={{fontWeight: "600"}}>
            Correo
        </Typography>
        <Typography sx={{mb: 2}}>
            {email}
        </Typography>
        <Typography variant="body1" component="div" sx={{fontWeight: "600"}}>
            Fecha Nacimiento
        </Typography>
        <Typography sx={{mb: 4}}>
            {birthdate}
        </Typography>
        <CardActions sx={{justifyContent: "center"}}>
        <Button variant="outlined" sx={{mr: 2}}>Preferencias</Button>
        <Button variant="contained">Editar Perfil</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}