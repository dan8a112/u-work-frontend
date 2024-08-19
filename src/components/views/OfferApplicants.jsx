import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TabMenu } from "../headers/TabMenu";
import { CandidateCard } from "../cards/CandidateCard";

function BasicTable({ estadoAplicacion, aplicantes, navigate }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:"1rem"}}>Nombre</TableCell>
            <TableCell sx={{fontSize:"1rem"}}>Fecha de Aplicacion</TableCell>
            <TableCell sx={{fontSize:"1rem"}}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aplicantes.filter(row => row.idEstadoSolicitud === estadoAplicacion).map((row) => (
            <TableRow key={row.idSolicitante} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{fontSize:"1rem"}}>
                <Box sx={{display:"flex", alignItems:"center"}}>
                  <img src={row.urlPerfil || "/default-profile.png"} alt="Perfil de usuario" style={{width: "40px", height:"40px", marginRight:"20px"}}/>
                  {row.nombreCompleto}
                </Box>
              </TableCell>
              <TableCell sx={{fontSize:"1rem"}}>{row.fechaSolicitud}</TableCell>
              <TableCell sx={{fontSize:"1rem"}}>
                <Button variant="contained" sx={{bgcolor:"#0D669E"}} onClick={()=>navigate(row.idSolicitante, row.idSolicitud)}>Ver perfil</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function OfferApplicants(){
  const { idCompany } = useParams();
  const [info, setInfo] = useState({ aplicantes: [], candidatos: [] });
  const [tab, setTab] = useState(0);
  
  const navigate = useNavigate();
  const handleNavigate = (idApplicant, idSolicitud) => {
    navigate(`/watchUserEnterprise/${idApplicant}/${idSolicitud}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:5001/api/ofertas/aplicantes/1`);
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idCompany]);

  const tabs = [
    { title:"Aplicando", amount: info.cantidadAplicando || 0 },
    { title:"Seleccionados", amount:`${info.cantidadSeleccionados || 0}/${info.cantidadPlazas || 0}` },
    { title:"Buscar Candidatos" }
  ];

  const renderTabs = (tab) => {
    switch (tab) {
      case 1:
        return <BasicTable estadoAplicacion={1} aplicantes={info.aplicantes} navigate={handleNavigate}/>;
      case 2:
        return (
          <>
            <BasicTable estadoAplicacion={2} aplicantes={info.aplicantes} />
            <Button variant="contained" sx={{m:"60px 40% 10px 40%"}} size="large">Finalizar Seleccion</Button>
          </>
        );
      case 3:
        return (
          <>
            <Box sx={{mb:3}}>
              <Typography fontSize="20px" fontWeight="500">Posibles Candidatos</Typography>
              <Typography>Elegimos a estas personas porque sus habilidades coinciden con tu oferta</Typography>
            </Box>
            {info.candidatos.map((candidato, index) => <CandidateCard key={index} candidato={candidato} />)}
          </>
        );
      default:
        return null;
    }
  };

  const handleChangeTab = (index) => setTab(index);

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '100vh', marginTop: 5}}>
      <Container maxWidth="lg" sx={{py:"70px"}}>
        <Box sx={{display:"flex", justifyContent:"space-between", p:"20px", bgcolor:"#fff", mb:"20px"}}>
          <Box display="inline-block">
            <Typography sx={{display:"inline-block", mr:2, fontSize:"1.25rem", fontWeight:"500"}}>Oferta</Typography>
            <Typography sx={{display:"inline-block", fontSize:"1.25rem"}}>{info.nombreOferta}</Typography>
          </Box>
          <Box display="inline-block" color="#49454F">
            <Typography sx={{display:"inline-block", mr:2, fontSize:"1.25rem", fontWeight:"500"}}>Creado</Typography>
            <Typography sx={{display:"inline-block", fontSize:"1.25rem"}}>{info.fechaPublicacion}</Typography>
          </Box>
        </Box>

        <Box sx={{display:"flex", flexDirection:"column", p:"20px", bgcolor:"#fff", mb:"20px"}}>
          <TabMenu tabs={tabs} indexSelected={tab} handleClick={handleChangeTab} />
          {renderTabs(tab + 1)}
        </Box>
      </Container>
    </Box>
  );
}
