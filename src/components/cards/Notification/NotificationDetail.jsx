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

const apiUrl = import.meta.env.VITE_API_URL;

export default function NotificationDetail({ open, handleClose, idNotification, serviceType }) {
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    if (idNotification !== null) {
      let detailUrl;
      let updateUrl;

      if (serviceType === 0) {
        detailUrl = `${apiUrl}/api/solicitante/detalle-notificacion/${idNotification}`;
        updateUrl = `${apiUrl}/api/solicitante/act-estado-notificaicon/${idNotification}`;
      } else if (serviceType === 1) {
        detailUrl = `${apiUrl}/api/empresa/notificacion/${idNotification}`;
        updateUrl = `${apiUrl}/api/empresa/act-estado-notificaicon/${idNotification}`;
        // Añade más casos si es necesario
      }

      axios.get(detailUrl)
        .then((response) => {
          setNotification(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error al obtener la notificación:", error);
        });

      axios.put(updateUrl)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error al actualizar la notificación:", error);
        });
    }
  }, [idNotification, serviceType]);

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
          {serviceType === 0 ? (
              <>
                <ButtonDictum text={"Aceptar Solicitud"} icon={<CheckCircle />} />
                <ButtonDictum text={"Rechazar Solicitud"} backgroundColor={'#d32828'} icon={<Cancel />} />
              </>
            ) : (
              <ButtonDictum text={"Ok"} icon={<CheckCircle />} onClick={handleClose} />
            )}
            
          </CardActions>
        </Card>
      )}
    </Dialog>
  );
}
