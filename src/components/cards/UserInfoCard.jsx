import {Card, CardContent, Typography, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { PreferenciasEmpleoModal } from '../modals/PreferenciasEmpleoModal';
import { useEffect, useState } from 'react';
import { UserRegister } from '../views/Register/UserRegister';


export function UserInfoCard({phoneNumber, email, birthdate}) {

  const [openPreferences, setOpenPreferences] = useState(false);

  const handleOpenPreferences = ()=>{setOpenPreferences(true)};
  const handleClosePreferences = ()=>{setOpenPreferences(false)};

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = ()=>{setOpenEdit(true)};
  const handleCloseEdit = ()=>{setOpenEdit(false)};

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/usuario/obtener");
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      //Si se abre la modal se hace la peticion
    };
  }, [openEdit])


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
        <Button variant="contained" onClick={handleOpenEdit}>Editar Perfil</Button>
        </CardActions>
      </CardContent>
      <PreferenciasEmpleoModal open={openPreferences} handleClose={handleClosePreferences}/>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <UserRegister edit={true}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}