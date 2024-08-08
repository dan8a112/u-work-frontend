import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import OutlinedCard from "../cards/OfertaCard";
import SearchInput from '../inputs/SearchInput';
import NotificationCard from '../cards/Notification/NotificationCard';
import NotificationDetail from '../cards/Notification/NotificationDetail';

const drawerWidth = 240;

function PermanentDrawerLeft() {
  const [selectedPage, setSelectedPage] = React.useState('Ofertas');

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
          p: '5%',
          overflowY: 'auto',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}>
          <NotificationCard></NotificationCard>
          <NotificationCard></NotificationCard>
          <NotificationCard></NotificationCard>
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
    </Box>
  );
}

export default PermanentDrawerLeft;
