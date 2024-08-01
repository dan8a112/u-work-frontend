import {Card, CardContent, Typography, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { PreferenciasEmpleoModal } from '../modals/PreferenciasEmpleoModal';
import { useState } from 'react';


export function UserInfoCard({phoneNumber, email, birthdate}) {

  const [openPreferences, setOpenPreferences] = useState(false);

  const handleOpenPreferences = ()=>{setOpenPreferences(true)};
  const handleClosePreferences = ()=>{setOpenPreferences(false)};

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
        <Button variant="outlined" sx={{mr: 2}} onClick={handleOpenPreferences}>Preferencias</Button>
        <Button variant="contained">Editar Perfil</Button>
        </CardActions>
      </CardContent>
      <PreferenciasEmpleoModal open={openPreferences} handleClose={handleClosePreferences}/>
    </Card>
  );
}