import * as React from 'react';
import { Box, Container, Divider, Drawer, Typography } from "@mui/material";
import { StatsCard } from "../cards/StatsCard";
import { ImageTextCard } from "../cards/ImageTextCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";
import NotificationCard from "../cards/Notification/NotificationCard";
import NotificationDetail from '../cards/Notification/NotificationDetail';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
export function HomeEnterprise() {
  const { idCompany } = useParams();
  const [openNotification, setOpenNotification] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState(null);
  const [estadisticas, setEstadisticas] = React.useState({});
  const [ofertasActivas, setOfertasActivas] = React.useState([]);
  const [notificaciones, setNotifications] = React.useState([]);

  const handleOpenNotification = (id) => {
    setSelectedNotification(id);
    setOpenNotification(true);
  }

  const handleCloseNotification = () => {
    setNotifications(notificaciones.map(notification =>
      notification.idNotificacion === selectedNotification
        ? { ...notification, estado: 1 }
        : notification
    ));
    setOpenNotification(false);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/empresa/home/${idCompany}`);
        setEstadisticas(response.data);
        setOfertasActivas(response.data.ofertasActivas || []);
        setNotifications(response.data.notificaciones || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [idCompany]);

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '635px' }}>
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
          {notificaciones.map((notificacion, index) =>
            <NotificationCard
              key={index}
              onClick={() => handleOpenNotification(notificacion[0])}
              title={notificacion[1]}
              date={notificacion[2]}
              state={notificacion[3]}
            />
          )}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 11, padding: 2 }}
      >
        <Container maxWidth="md" sx={{ width: "780px" }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "20px"
          }}>
            <Typography sx={{ fontSize: "1.7rem", mr: "32px", fontWeight: "600" }}>
              Bienvenido, {estadisticas.nombreEmpresa}
            </Typography>
            <img src={estadisticas.logoEmpresa} style={{ width: "200px" }} />
          </Box>

          <Box sx={{
            display: "flex",
            gap: "20px",
            mb: "20px"
          }}>
            <StatsCard text="Ofertas Activas">
              <Typography variant="h3" fontWeight="500">{estadisticas.cantOfertasAct}</Typography>
            </StatsCard>
            <StatsCard text="Promedio de Solicitantes por Oferta">
              <Typography variant="h3" fontWeight="500">{estadisticas.promSolicitanteOfer}</Typography>
            </StatsCard>
            <StatsCard text="Distribución de Género">
              <ImageTextCard url="/img/man.png" text={estadisticas.porcentajeHombresAplicante} mb="10px"></ImageTextCard>
              <ImageTextCard url="/img/woman.png" text={estadisticas.porcentajeMujeresAplicante}></ImageTextCard>
            </StatsCard>
          </Box>

          <Box sx={{
            boxSizing: 'border-box',
            p: '5%',
            overflowY: 'auto',
            backgroundColor: "#fff"
          }}>
            <Box mb="25px">
              <Typography sx={{ color: '#3b3b3b', paddingInline: '20px', fontSize: "1.4rem" }}>
                Últimas ofertas activas
              </Typography>
              <Divider sx={{ width: 250, color: '#3b3b3b' }} variant="middle" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {ofertasActivas.map((oferta, index) => (
                <OfertaEnterpriseCard
                  key={index}
                  index={index + 1}
                  card={{
                    titulo: oferta[1],
                    descripcion: oferta[2],
                    fechaPublicacion: oferta[3],
                    src: "/offersDetailEnterprise"
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <NotificationDetail
        serviceType={1}
        open={openNotification}
        handleClose={handleCloseNotification}
        idNotification={selectedNotification}
      />
    </Box>
  );
}
