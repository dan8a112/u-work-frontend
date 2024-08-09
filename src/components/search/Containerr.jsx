import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container, Dialog, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import OutlinedCard from "../cards/OfertaCard";
import SearchInput from '../inputs/SearchInput';
import NotificationCard from '../cards/Notification/NotificationCard';
import NotificationDetail from '../cards/Notification/NotificationDetail';

function PermanentDrawerLeft() {

  const [selectedPage, setSelectedPage] = React.useState('Ofertas');

  const [openNotification, setOpenNotification] = React.useState(false);

  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const handleOpenNotification = (id)=>{
    setSelectedNotification(id)
    setOpenNotification(true)
  }
  
  const handleCloseNotification = ()=>{setOpenNotification(false)}

  const renderContent = () => {
    switch (selectedPage) {
      case 'Ofertas':
        return (
          <>
            <OutlinedCard
              fechaPublicacion="12-12-2012"
              puesto="Ejecutivo de ventas"
              empresa="UNAH Universidad Autonoma de Honduras"
              descripcion="Persona encargada de gestionar las ventas de la compania"
            />
            <OutlinedCard
              fechaPublicacion="12-12-2012"
              puesto="Ejecutivo de ventas"
              empresa="UNAH Universidad Autonoma de Honduras"
              descripcion="Persona encargada de gestionar las ventas de la compania"
            />
          </>
        );
      case 'Tus Aplicaciones':
        return <Typography>Aplicaciones</Typography>;
      default:
        return null;
    }
  };

  const notificationsCards = [
    {
      idNotificacion: 0,
      titulo: "Oferta de empleo para programador Backend",
      fecha: "Sep 21, 2024",
      logoEmpresa:"img/bac_logo.png",
      estadoVisualizacion: false
    },
    {
      idNotificacion: 1,
      titulo: "Oferta de empleo para gestionador de BD",
      fecha: "Sep 24, 2024",
      logoEmpresa:"img/bac_logo.png",
      estadoVisualizacion: false
    },
    {
      idNotificacion: 2,
      titulo: "Oferta de empleo para gestor de redes e infraestructura",
      fecha: "Sep 25, 2024",
      logoEmpresa:"img/bac_logo.png",
      estadoVisualizacion: false
    },
  ]

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
          <SearchInput></SearchInput>
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
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}>
          {notificationsCards.map((value,index)=>
          <NotificationCard 
          key={index} 
          onClick={()=>{handleOpenNotification(value.idNotificacion)}} 
          title={value.titulo}
          date={value.fecha}
          logo={value.logoEmpresa}
          />
          )}
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

export default PermanentDrawerLeft;
