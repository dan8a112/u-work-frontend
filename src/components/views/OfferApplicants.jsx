import { Box, Button, Container, Grid, Typography } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { TabMenu } from "../headers/TabMenu";
import { CandidateCard } from "../cards/CandidateCard";

//Datos temporales

const info ={
    nombreOferta: "Trabajo desde casa Database Manager Engineer Experimentado",
    fechaPublicacion: "23 May, 2023",
    cantidadAplicando: 24,
    cantidadSeleccionados: 1,
    cantidadPlazas: 2,
    aplicantes:[
        { 
        id: 1, 
        urlPerfil: "img/man.png", 
        nombre: "Daniel Alexander Ochoa Osavas", 
        fechaAplicacion: "05 Abr, 2024", 
        estadoAplicacion: 1
        },
        { id: 2, 
        urlPerfil: "img/woman.png", 
        nombre: "Juan Francisco Ochoa Osavas", 
        fechaAplicacion: "05 Abr, 2024", 
        estadoAplicacion: 1},
        { id: 3, 
        urlPerfil: "img/man.png", 
        nombre: "Carlos Mariano Ochoa Osavas", 
        fechaAplicacion: "05 Abr, 2024", 
        estadoAplicacion: 2}
    ],
    candidatos:[
         { id: 1, 
        urlPerfil: "img/man.png", 
        nombre: "Daniel Alexander Ochoa Osavas", 
        titular: "Ingeniero de software graduado de UNAH", 
        lugarOrigen: "Talanga, Francisco Morazan, Honduras",
        formaciones: ["HTML","CSS","JavaScript","Python"]
        },
        { id: 2, 
        urlPerfil: "img/woman.png", 
        nombre: "Juan Francisco Ochoa Osavas", 
        titular: "Ingeniero Civil graduado de UNAH", 
        lugarOrigen: "Estados Unidos",
        formaciones: ["HTML","React","JavaScript","Python"]
        },
        { id: 3, 
        urlPerfil: "img/man.png", 
        nombre: "Carlos Mariano Ochoa Osavas", 
        titular: "Ingeniero Electrico graduado de UNAH", 
        lugarOrigen: "Tela, Atlantida, Honduras",
        formaciones: ["Java","C++","JavaScript","Python"]
        }
    ]
}

const tabs = [
    {
        title:"Aplicando",
        amount: info.cantidadAplicando
    },
    {
        title:"Seleccionados",
        amount:`${info.cantidadSeleccionados}/${info.cantidadPlazas}`
    },
    {
        title:"Buscar Candidatos"
    }
]

function BasicTable({estadoAplicacion}) {
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
        <TableBody >
          {info.aplicantes.filter(row => row.estadoAplicacion===estadoAplicacion).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{fontSize:"1rem"}}>
                <Box sx={{display:"flex", alignItems:"center"}}>
                <img src={row.urlPerfil} alt="Perfil de usuario" style={{width: "40px", height:"40px", marginRight:"20px"}}/>
                {row.nombre}
                </Box>
              </TableCell>
              <TableCell sx={{fontSize:"1rem"}}>{row.fechaAplicacion}</TableCell>
              <TableCell sx={{fontSize:"1rem"}}>
                <Button variant="contained" sx={{bgcolor:"#0D669E"}}>Ver perfil</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const renderTabs = (tab) => {
    switch (tab) {
        case 1:
            return(
            <BasicTable estadoAplicacion={1}></BasicTable>
            );
        case 2:
            return(<>
            <BasicTable estadoAplicacion={2}></BasicTable>
            <Button variant="contained" sx={{m:"60px 40% 10px 40%"}} size="large">Finalizar Seleccion</Button>
            </>    
            );
        case 3:
            return(<>
            <Box sx={{mb:3}}>
            <Typography fontSize="20px" fontWeight="500">Posibles Candidatos</Typography>
            <Typography>Elegimos a estas personas porque sus habilidades coinciden con tu oferta</Typography>
            </Box>
            {info.candidatos.map((candidato, index)=><CandidateCard key={index} candidato={candidato}></CandidateCard>)}
            </> 
            );
            
        default:
            break;
    }
}

export function OfferApplicants(){

    //Estado que maneja las pestañas pueden ser = 0, 1, 2...
    const [tab, setTab] = useState(0);

    const handleChangeTab = (index)=>{
        setTab(index);
    } 

    return(
        <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '100vh'}}>
            <Container maxWidth="lg" sx={{py:"70px"}}>
                <Box sx={{display:"flex", justifyContent:"space-between", p:"20px", bgcolor:"#fff", mb:"20px"}}>
                    <Box display="inline-block">
                    <Typography sx={{display:"inline-block", mr:2, fontSize:"1.25rem", fontWeight:"500"}}>Oferta</Typography>
                    <Typography sx={{display:"inline-block", fontSize:"1.25rem"}}>Trabajo desde casa quality assurance Engineer</Typography>
                    </Box>
                    <Box display="inline-block" color="#49454F">
                    <Typography sx={{display:"inline-block", mr:2, fontSize:"1.25rem", fontWeight:"500"}}>Creado</Typography>
                    <Typography sx={{display:"inline-block", fontSize:"1.25rem"}}>24 Jun, 2024</Typography>
                    </Box>
                </Box>

                <Box sx={{display:"flex", flexDirection:"column", p:"20px", bgcolor:"#fff", mb:"20px"}}>
                    <TabMenu tabs={tabs} indexSelected={tab} handleClick={handleChangeTab}></TabMenu>
                    {renderTabs(tab+1)}
                </Box>
                
            </Container>
        </Box>
    );
}