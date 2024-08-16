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
import axios from 'axios';

export default function NotificationDetail({ open, handleClose, idNotification }) {
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    if (idNotification !== null) {
      axios.get(`http://localhost:5001/api/solicitante/detalle-notificacion/${idNotification}`)
        .then((response) => {
          setNotification(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la notificación:", error);
        });
      axios.put(`http://localhost:5001/api/solicitante/act-estado-notificaicon/${idNotification}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error("Error al obtener la notificación:", error);
      });
    }
  }, [idNotification]);

  return (
    <Dialog open={open} onClose={handleClose}>
      {notification && (
        <Card sx={{ position: 'relative', p: "20px" }}>
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
            <ButtonDictum text={"Aceptar Solicitud"} icon={<CheckCircle />} />
            <ButtonDictum text={"Rechazar Solicitud"} backgroundColor={'#d32828'} icon={<Cancel />} />
          </CardActions>
        </Card>
      )}
    </Dialog>
  );
}
