import * as React from 'react';
import { Box, Button, Container, Divider, Drawer, Typography } from "@mui/material";
import { ImageTextCard } from "../cards/ImageTextCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const OffersType = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  height: "59px",
  cursor: "pointer",
}));

export function OffersEnterprise() {
  const [buttonSelected, setButtonSelected] = React.useState(null);

  const handleMenuItemClick = (buttonClick) => {
    setButtonSelected(buttonClick);
  };

  const card = {
    titulo: "Programador frontend en remoto",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium incidunt ab cumque amet asperiores.",
    fechaPublicacion: "23 Mar, 2024",
    src: "/offersDetailEnterprise"
  };

  const navigate = useNavigate();
  const handleOnClick = (url) => {
      navigate(url)
  };

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
            height: '40%',
            border: '7px solid white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            width: '90%',
            p: '5% 0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <OffersType
            onClick={() => handleMenuItemClick(1)}
            sx={{ backgroundColor: buttonSelected === 1 ? "#F1FAF9" : "#fff" }}
          >
            <ImageTextCard url="img/check.svg" text="Ofertas Activas" fw={400} height={"59px"} />
          </OffersType>
          <OffersType
            onClick={() => handleMenuItemClick(2)}
            sx={{ backgroundColor: buttonSelected === 2 ? "#F1FAF9" : "#fff" }}
          >
            <ImageTextCard url="img/Clock.svg" text="Ofertas Finalizadas" fw={400} height={"59px"} />
          </OffersType>
          <OffersType
            onClick={() => handleMenuItemClick(3)}
            sx={{ backgroundColor: buttonSelected === 3 ? "#F1FAF9" : "#fff" }}
          >
            <ImageTextCard url="img/trendingdown.svg" text="Ofertas Expiradas" fw={400} height={"59px"} />
          </OffersType>
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
            justifyContent: "flex-end",
            mb: "20px"
          }}>
            <Button variant="contained">Agregar Oferta</Button>
          </Box>

          <Box
            sx={{
              boxSizing: 'border-box',
              p: '5%',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              backgroundColor: "#fff",
              '&::-webkit-scrollbar': {
                display: 'none',
              }
            }}
          >
            <Box mb="25px">
              <Typography sx={{ color: '#3b3b3b', paddingInline: '20px', fontSize: "1.4rem" }}>
                Últimas ofertas activas
              </Typography>
              <Divider sx={{ width: 250, color: '#3b3b3b' }} variant="middle" />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <OfertaEnterpriseCard index={'1'} card={card} seeDetail={() => handleOnClick(card.src)}/>
              <OfertaEnterpriseCard index={'2'} card={card} seeDetail={() => handleOnClick(card.src)}/>
              <OfertaEnterpriseCard index={'3'} card={card} seeDetail={() => handleOnClick(card.src)}/>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
