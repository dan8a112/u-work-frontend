import { Box, Container, Divider, Drawer, Typography } from "@mui/material";
import { StatsCard } from "../cards/StatsCard";
import { ImageTextCard } from "../cards/ImageTextCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";

export function HomeEnterprise(){
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
            <OfertaEnterpriseCard/>
            <OfertaEnterpriseCard/>
            <OfertaEnterpriseCard/>
            </Box>
        </Box>
        </Container>
      </Box>

    </Box>
    )
}