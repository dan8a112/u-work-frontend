import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ButtonDictum from '../../buttons/ButtonResult';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { Dialog } from '@mui/material';

const dataFetch = [
  {
  idNotificacion: 0,
  titulo: "Oferta de empleo como desarrollador Backend",
  logoEmpresa: "img/bac_logo.svg",
  nombreEmpresa: "Bac Credomatic",
  descripcion: "Daniel Ochoa, la empresa BAC Credomatic te ha contactado para que apliques a la oferta 'Desarrollador Backend con SpringBoot' ",
  fecha: "23 Jun, 2023",
  idSolicitud: 1
  },
  {
    idNotificacion: 1,
    titulo: "Oferta de empleo como desarrollador Backend",
    logoEmpresa: "img/bac_logo.svg",
    nombreEmpresa: "Ficohsa",
    descripcion: "Daniel Ochoa, la empresa Ficohsa te ha contactado para que apliques a la oferta 'Desarrollador Backend con SpringBoot' ",
    fecha: "23 Jun, 2023",
    idSolicitud: 1
    },
    {
      idNotificacion: 2,
      titulo: "Oferta de empleo como desarrollador Backend",
      logoEmpresa: "img/bac_logo.svg",
      nombreEmpresa: "Facebook",
      descripcion: "Daniel Ochoa, la empresa Facebook te ha contactado para que apliques a la oferta 'Desarrollador Backend con SpringBoot' ",
      fecha: "23 Jun, 2023",
      idSolicitud: 1
    }
]


export default function NotificationDetail({open, handleClose, idNotification}) {

  //Se simula un fetch
  const [notification, setNotification] = React.useState({});

  React.useEffect(()=>{
    setNotification(dataFetch[idNotification]);
  },[idNotification])


  return ( idNotification &&
    <Dialog
      open={open}
      onClose={handleClose}
    >
    <Card sx={{position: 'relative', p: "20px"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={notification.logoEmpresa}>
          </Avatar>
        }
        title={notification.titulo}
        subheader={notification.nombreEmpresa}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {notification.descripcion}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ width: '100%', justifyContent: 'flex-end' }}>
        <ButtonDictum text={"Aceptar Solicitud"} icon={<CheckCircle/>}></ButtonDictum>
        <ButtonDictum text={"Rechazar Solicitud"} backgroundColor={'#d32828'} icon={<Cancel/>}></ButtonDictum>
      </CardActions>
    </Card>
    </Dialog>
  );
}
