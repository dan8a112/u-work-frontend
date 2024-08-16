import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container, Dialog, Typography, Divider } from "@mui/material";
import OutlinedCard from '../cards/OfertaCard';
import NotificationCard from '../cards/Notification/NotificationCard';
import NotificationDetail from '../cards/Notification/NotificationDetail';
import SearchInput from '../inputs/SearchInput';
import { useParams } from 'react-router-dom';
import axios from "axios";

export function HomeUser() {
  const { idApplicant } = useParams();
  const [selectedPage, setSelectedPage] = React.useState('Ofertas');
  const [openNotification, setOpenNotification] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState(null);
  const [ofertas, setOfertas] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/solicitante/home/${idApplicant}`);
        setOfertas(response.data.ofertas || []);
        setNotifications(response.data.notificaciones || []);
        setCategories(response.data.categorias || []);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [idApplicant]);

    const categorias = categories.map((category) => ({
      label: category.categoria
    }));
    

  const handleOpenNotification = (id) => {
    setSelectedNotification(id);
    setOpenNotification(true);
  }

  const handleCloseNotification = () => {
    setNotifications(notifications.map(notification =>
      notification.idNotificacion === selectedNotification
        ? { ...notification, estado: 1 }
        : notification
    ));
    setOpenNotification(false);
  }

  const renderContent = () => {
    switch (selectedPage) {
      case 'Ofertas':
        return ofertas.map((oferta) => (
          <OutlinedCard
            key={oferta.idOferta}
            idOferta={oferta.idOferta}
            fechaPublicacion={oferta.fechaPublicacionOferta}
            puesto={oferta.tituloOferta}
            empresa={oferta.nombreEmpresa}
            descripcion={oferta.descripcion}
            imageCompany={oferta.url_logo}
          />
        ));
      case 'Tus Aplicaciones':
        return <Typography>Aplicaciones</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '635px' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            marginTop: 13,
            marginLeft: 3,
            display: 'flex',
            alignItems: 'center',
            height: '80%',
            border: '7px solid white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography sx={{ marginTop: 2 }}>
          Busca tu empleo por categorias
        </Typography>
        <List>
          <SearchInput categories={categorias}/>
        </List>
        <Box sx={{ marginTop: 7 }}>
          <Typography sx={{ color: '#3b3b3b77', paddingInline: '20px', paddingBottom: 0 }}>
            Notificaciones
          </Typography>
          <Divider sx={{ width: 250, color: '#3b3b3b77' }} variant="middle" />
        </Box>

        <Box sx={{
          boxSizing: 'border-box',
          width: '90%',
          p: '5% 0',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}>
          {notifications.length > 0 ? notifications.map((notification) =>
            <NotificationCard
              key={notification.idNotificacion}
              onClick={() => handleOpenNotification(notification.idNotificacion)}
              title={notification.titulo}
              date={notification.fecha}
              state={notification.estado}
            />
          ) : <Typography>No hay notificaciones</Typography>}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 11, padding: 2 }}
      >
        <Container maxWidth="md" sx={{ backgroundColor: "#F1FAF9" }}>
          {renderContent()}
        </Container>
      </Box>

      <NotificationDetail
        open={openNotification}
        handleClose={handleCloseNotification}
        idNotification={selectedNotification}
      />
    </Box>
  );
}
