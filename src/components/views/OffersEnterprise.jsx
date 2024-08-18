import * as React from 'react';
import { Box, Button, Container, Divider, Drawer, Typography } from "@mui/material";
import { ImageTextCard } from "../cards/ImageTextCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const OffersType = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  height: "59px",
  cursor: "pointer",
  padding: "10px"
}));

export function OffersEnterprise() {

  const navigate = useNavigate();

  const {idCompany} = useParams();

  const [ofertasDisp, setOfertasDisp] = React.useState(null);
  const [ofertasFin, setOfertasFin] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  
  React.useEffect(()=>{
    const fetchData = async () => {
      try {
        const offers = await axios.get(
          `http://localhost:5001/api/ofertas/mostrar/${idCompany}`
        );

        setOfertasDisp(offers.data.filter(offer => offer.estadoOferta == 1));
        setOfertasFin(offers.data.filter(offer => offer.estadoOferta == 0));
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  const [buttonSelected, setButtonSelected] = React.useState(1);

  const handleMenuItemClick = (buttonClick) => {
    setButtonSelected(buttonClick);
  };



  return (
    <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '100vh' }}>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            marginTop: 14,
            marginLeft: 6,
            display: 'flex',
            alignItems: 'center',
            height: '16%',
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
            <ImageTextCard url="../../img/check.svg" text="Ofertas Activas" fw={400} height={"59px"} />
          </OffersType>
          <OffersType
            onClick={() => handleMenuItemClick(2)}
            sx={{ backgroundColor: buttonSelected === 2 ? "#F1FAF9" : "#fff" }}
          >
            <ImageTextCard url="../../img/Clock.svg" text="Ofertas Finalizadas" fw={400} height={"59px"} />
          </OffersType>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 11, padding: 2 }}
      >
        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: "20px"
          }}>
            <Button variant="contained" onClick={()=>{navigate("/createOffer")}}>Agregar Oferta</Button>
          </Box>

          <Box
            sx={{
              boxSizing: 'border-box',
              p: '5%',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              backgroundColor: "#fff",
              minHeight: "800px",
              '&::-webkit-scrollbar': {
                display: 'none',
              }
            }}
          >
            <Box mb="25px">
              <Typography sx={{ color: '#3b3b3b', paddingInline: '20px', fontSize: "1.4rem" }}>
              {buttonSelected==1 ? "Últimas ofertas activas" : "Ultimas ofertas finalizadas"}
              </Typography>
              <Divider sx={{ width: 250, color: '#3b3b3b' }} variant="middle" />
            </Box>
            {
            success &&
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {buttonSelected==1 ? (
                ofertasDisp.map((value, index)=><OfertaEnterpriseCard key={index} index={index+1} card={value}/>)
              ): (
                ofertasFin.map((value, index)=><OfertaEnterpriseCard key={index} index={index+1} card={value}/>)
              )}
            </Box>
            }
            
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
