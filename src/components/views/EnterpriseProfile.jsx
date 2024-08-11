import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { UserProfileCard } from "../cards/UserProfileCard";
import { UserInfoCard } from "../cards/UserInfoCard";
import { UserContentCard } from "../cards/UserContentCard";
import { HistorialAcademicoForm } from "../forms/HistorialAcademicoForm";
import CompanyProfileCard from "../cards/InfoEnterprise";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import DirectorCard from "../cards/DirectorCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";

const company = {
    name: 'Bac Credomatic Honduras.',
    industry: 'Tecnología',
    offersCount: 25,
    country: 'Honduras',
    imageUrl: 'img/bac_logo.svg'
  };
  const card = {
    titulo: "Programador frontend en remoto",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium incidunt ab cumque amet asperiores.",
    fechaPublicacion: "23 Mar, 2024"
  }
  

export function EnterpriseProfile(){
    return(
        <Container sx={{paddingY: 4, marginTop: 2, bgcolor: "#F1FAF9"}} maxWidth="md">
            <CompanyProfileCard company={company} />
            <DetalleOfertaCard
            backgroundColor={'#F1FAF9'}
            title="DESCRIPCION">
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                </Typography>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="INFORMACION DE CONTACTO">
                <Box sx={{ display: 'flex', flexDirection: 'row', maxWidth:'350px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width:'100px' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Teléfono:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Correo:</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>Sitio Web:</Typography>
                        
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Typography>2223-4565</Typography>
                        <Typography>afcastillof@unah.hn</Typography>
                        <Typography>https://www.baccredomatic.com/</Typography>
                    </Box>
                </Box>
                
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="Director General">
                <DirectorCard></DirectorCard>
                
            </DetalleOfertaCard>
            <DetalleOfertaCard
                title="Ofertas Activas">
                <Box sx={{display:"flex", flexDirection:"column", gap:"20px"}}>
                <OfertaEnterpriseCard index={'1'} card={card}/>
                <OfertaEnterpriseCard index={'2'} card={card}/>
                <OfertaEnterpriseCard index={'3'} card={card}/>
            </Box>
                
            </DetalleOfertaCard>
            
        </Container>
    );
}