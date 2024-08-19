import { Box, Container, Typography } from "@mui/material";
import CompanyProfileCard from "../cards/InfoEnterprise";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import DirectorCard from "../cards/DirectorCard";
import { OfertaEnterpriseCard } from "../cards/OfertaEnterpriseCard";
import { useEffect, useState } from "react";
import axios from "axios";

  const idEmpresa = localStorage.getItem('idEmpresa');
  const apiUrl = import.meta.env.VITE_API_URL;

  
export function EnterpriseProfile(){

    const [company, setCompany] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${apiUrl}/api/empresa/perfil/${idEmpresa}`
            );
            setCompany(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);
    return(company &&
        <Container sx={{paddingY: 4, marginTop: 2, bgcolor: "#F1FAF9"}} maxWidth="md">
            <CompanyProfileCard company={company} />
            <DetalleOfertaCard
            backgroundColor={'#F1FAF9'}
            title="DESCRIPCION">
                <Typography>
                    {company.descripcion}
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
                        <Typography>{company.telefono}</Typography>
                        <Typography>{company.correo}</Typography>
                        <Typography>{company.sitioWeb}</Typography>
                    </Box>
                </Box>
                
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="Director General">
                <DirectorCard
                    nombre={company.director[0].nombre}
                    telefono={company.director[0].telefono}
                />
            </DetalleOfertaCard>
            <DetalleOfertaCard
                title="Ofertas Activas">
                <Box sx={{display:"flex", flexDirection:"column", gap:"20px"}}>
                {company.ofertas.map((oferta, index)=><OfertaEnterpriseCard key={index} index={index+1} card={oferta}/>)}
            </Box>
                
            </DetalleOfertaCard>
            
        </Container>
    );
}