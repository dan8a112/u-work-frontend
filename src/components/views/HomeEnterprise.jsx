import * as React from 'react';
import { Box, Container, Divider, Drawer, Typography } from "@mui/material";
import { StatsCard } from "../cards/StatsCard";
import { ImageTextCard } from "../cards/ImageTextCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";
import NotificationCard from "../cards/Notification/NotificationCard";
import NotificationDetail from '../cards/Notification/NotificationDetail';

export function HomeEnterprise(){
  const [openNotification, setOpenNotification] = React.useState(false);

  const [selectedNotification, setSelectedNotification] = React.useState(null);

  const handleOpenNotification = (id)=>{
    setSelectedNotification(id)
    setOpenNotification(true)
  }
  const handleCloseNotification = ()=>{setOpenNotification(false)}

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

  const card = {
    titulo: "Programador frontend en remoto",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium incidunt ab cumque amet asperiores.",
    fechaPublicacion: "23 Mar, 2024"
  }

    return(
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
        <Container maxWidth="md" sx={{ width:"780px"}}>
            <Box sx={{display: "flex", 
                alignItems:"center", 
                justifyContent:"space-between",
                mb: "20px"
                }}>
                <Typography sx={{fontSize: "1.7rem", mr:"32px", fontWeight:"600"}}>Bienvenido, BAC CREDOMATIC</Typography>
                <img src="img/bac_logo.svg" style={{width:"200px"}}/>
            </Box>
            <Box sx={{
                display: "flex", 
                gap: "20px",
                mb:"20px"
            }}>
                <StatsCard text="Ofertas Activas">
                    <Typography variant="h3" fontWeight="500">13</Typography>
                </StatsCard>
                <StatsCard text="Ofertas Activas">
                    <Typography variant="h3" fontWeight="500">13</Typography>
                </StatsCard>
                <StatsCard text="Ofertas Activas">
                    <ImageTextCard url="img/man.png" text="40%" mb="10px"></ImageTextCard>
                    <ImageTextCard url="img/woman.png" text="60%"></ImageTextCard>
                </StatsCard>
            </Box>
            
            <Box sx={{
          boxSizing: 'border-box',
          p: '5%',
          overflowY: 'auto',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          backgroundColor:"#fff"
        }}>
            <Box mb="25px">
            <Typography sx={{ color: '#3b3b3b', paddingInline: '20px', fontSize:"1.4rem"}}>
                Ultimas ofertas activas
            </Typography>
            <Divider sx={{ width: 250, color: '#3b3b3b' }} variant="middle" />
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", gap:"20px"}}>
            <OfertaEnterpriseCard index={'1'} card={card}/>
            <OfertaEnterpriseCard index={'2'} card={card}/>
            <OfertaEnterpriseCard index={'3'} card={card}/>
            </Box>
        </Box>
        </Container>
      </Box>
      <NotificationDetail
        open={openNotification}
        handleClose={handleCloseNotification}
        idNotification={selectedNotification}
      />

    </Box>
    )
}