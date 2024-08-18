import { Box, Container, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import { ItemsOfertaCard, ItemsOfertaDual } from "../cards/ItemsOfertaCard";
import { ImageTrain } from "../cards/ImageTrain";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";


const information = {
    nombreOferta: "Trabajo desde casa como ingeniero de software y manager de base de datos",
    urlEmpresa: "img/bac_logo.svg",
    nombreEmpresa: "BAC CREDOMATIC",
    fechaPublicacion: "17 Jun, 2024",
    fechaPublicacion: "31 Jun, 2024",
    lugar: "Tegucigalpa, Francisco Morazan, Honduras",
    tipoEmpleo: "Tecnologias de la informacion",
    cargos: ["Programador", "DatabaseManager"],
    vacantes: 1,
    tipoContratacion: "Tiempo completo",
    modalidad: "En remoto",
    nivelAcademico: "Educacion Superior",
    descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis necessitatibus, assumenda quod dolorum explicabo laboriosam molestias et officiis magnam voluptates, rerum eligendi nemo dolore velit ipsam optio ipsa eum unde?",
    requisitosAcademicos: ["React", "Diseno Grafico", "MySQL", "Ingenieria en Sistemas"],
    experienciaRequerida: ["Programador Frontend", "Database Manager"],
    idiomas: [{nombre: "Ingles", nivel:"Avanzado"},{nombre: "Espanol", nivel:"Nativo"}],
    aplicantes: ["img/man.png","img/woman.png","img/man.png","img/man.png"],
    cantidadAplicantes: 12,
    src: "/Applicants",
}

const apiUrl = import.meta.env.VITE_API_URL;

export function OffersDetailEnterprise(){

    const {idOffer} = useParams();

    const [openMenu, setOpenMenu] = useState(null);

    const [offer, setOffer] = useState(null);
     
    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${apiUrl}/api/ofertas/detalleEmpresa/${idOffer}`
            );
            setOffer(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);

    const handleClick = (event) => {
        setOpenMenu(event.currentTarget);
      };
    
      const handleClose = () => {
        setOpenMenu(null);
      };

      const navigate = useNavigate();
      const handleOnClickSeeAplicants = (url) => {
        navigate(url);
      }
    return( offer &&
    <Container sx={{position:"relative", padding: "30px", backgroundColor: "#F1FAF9", marginTop:10}} maxWidth="md" disableGutters>
        <IconButton 
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{position:"absolute", top:"20px", right:"20px"}}>
            <MoreVert fontSize="large"/>
        </IconButton>
        <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>
            <Delete sx={{mr:"10px"}}></Delete>
            Eliminar
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Edit sx={{mr:"10px"}}></Edit>
            Editar
            </MenuItem>
        </Menu>
        <Grid container gap={5} justifyContent="center" marginBottom="30px">
            <Grid item>
                <img src={offer.urlEmpresa} alt="logo de empresa" style={{width:"200px"}}/>
            </Grid>
            <Grid item alignContent="center" xs={7}>
                <Typography variant="h5" fontWeight="600">
                    {offer.nombreOferta}
                </Typography>
            </Grid>
        </Grid>
        <Typography fontSize="1.1rem" fontWeight="600" marginBottom={1}>{offer.nombreEmpresa}</Typography>
        <Box sx={{pl: "20px", mb:"20px"}}>
            <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}}>Publicado  <span style={{fontWeight:"400"}}>{offer.fechaPublicacion}</span></Typography>
            <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}} >Expira <span style={{fontWeight:"400"}}>{offer.fechaPublicacion}</span></Typography>
            <Typography sx={{fontWeight: "400", color:"#49454F"}} >{offer.lugar}</Typography>
        </Box>
        <Typography fontSize="1.1rem" fontWeight="600" marginBottom={1}>Candidatos</Typography>
        <Box onClick={() => handleOnClickSeeAplicants(`/Applicants/${idOffer}`)} sx={{display:"inline-flex", p:"15px 30px", mb: "20px", bgcolor:"#0D9E8230", alignItems:"center", borderRadius:"8px", cursor:"pointer"}}>
            <ImageTrain images={offer.aplicantesImg}/>
            {offer.cantidadAplicantes-offer.aplicantesImg.length > 0 ? (
                <Typography style={{fontSize:"20px", color:"#0D9E82", fontWeight:"500"}}>
                +{offer.cantidadAplicantes-offer.aplicantesImg.length} Candidatos
                </Typography>
            ):<></>}
            
        </Box>

        <Container disableGutters>
            <DetalleOfertaCard
            title="DETALLE DE LA OFERTA">
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Tipo de Empleo</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{offer.tipoEmpleo}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Cargos</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{offer.cargos.join(", ")}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Puestos Vacantes</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{offer.vacantes}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Modalidad</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{offer.modalidad}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Nivel Academico</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{offer.nivelAcademico}</Typography>
                </Grid>
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="DESCRIPCION">
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate sapiente a fugit ullam odit, nemo eveniet architecto magnam repellat necessitatibus corporis molestias porro quae iste deserunt blanditiis dignissimos aperiam.
                </Typography>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="HABILIDADES REQUERIDAS | EDUCACION">
                <Grid container columnSpacing={3}>
                    {offer.requisitosAcademicos.map((value, index)=><Grid item key={index}><ItemsOfertaCard itemName={value}/></Grid>)}
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="EXPERIENCIA LABORAL REQUERIDA">
                <Grid container columnSpacing={3}>
                    {offer.experienciaRequerida.map((value, index)=><Grid item key={index}><ItemsOfertaCard itemName={value}/></Grid>)}
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="IDIOMAS REQUERIDOS">
                <Grid container columnSpacing={3}>
                    {offer.idiomas.map((value, index)=><Grid item key={index}><ItemsOfertaDual itemName={value.nombre} detail={value.nivel}/></Grid>)}
                </Grid>
            </DetalleOfertaCard>
        </Container>
    </Container>
    );
}