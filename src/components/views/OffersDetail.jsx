import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import { ItemsOfertaCard, ItemsOfertaDual } from "../cards/ItemsOfertaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export function OffersDetail(){

    const{offerId} = useParams();

    const [offer, setOffer] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");
     

    useEffect(()=>{
        const idApplicant = localStorage.getItem('idPersonaSoli');
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/ofertas/detalle?idOferta=${offerId}&idSolicitante=${idApplicant}`
            );
            setOffer(response.data);
          } catch (error) {
            console.error(error);
          }
        }

        fetchData();
    }, []);

    const applicateToOffer = async ()=>{
        try {
            const applicationBody = {
                idOferta: offerId,
                idSolicitante: 1, //Por defecto de momento
                idEstadoSolicitud: 1,
                emisorSolicitud: 0,
                descripcion: applicationMessage
            }

            const response = await axios.post(
              `http://localhost:5001/api/solicitudes/crear`,
              applicationBody
            );

            console.log("Se ha creado una nueva solicitud ", response.data);
            setOpenNotification(true);
            setOffer({
                ...offer,
                aplicando: 1,
              })
          } catch (error) {
            console.error(error);
          }

    }
    

    return( offer &&
    <Container sx={{padding: "30px", backgroundColor: "#F1FAF9", marginTop:10, position:"relative"}} maxWidth="md" disableGutters>
        <Grid container gap={5} justifyContent="center" marginBottom="30px">
            <Grid item>
                <img src={offer.urlEmpresa} alt="logo de empresa" style={{width:"200px"}}/>
            </Grid>
            <Grid item alignContent="center" xs={8}>
                <Typography variant="h5" fontWeight="600">
                    {offer.nombreOferta}
                </Typography>
            </Grid>
        </Grid>
        <Typography fontSize="1.1rem" fontWeight="600" marginBottom={1}>{offer.nombreEmpresa}</Typography>
        <Container sx={{pl: "20px", mb:"20px", position:"relative"}}>
            <Grid container>
                <Grid item xs={1.5}>
                <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}}>Publicado</Typography>
                </Grid>
                <Grid item xs={10.5}>
                <span style={{fontWeight:"400"}}>{offer.fechaPublicacion}</span>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={1.5}>
                <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}} >Expira</Typography>
                </Grid>
                <Grid item xs={10.5}>
                <span style={{fontWeight:"400"}}>{offer.fechaPublicacion}</span>
                </Grid>
            </Grid>
            <Typography sx={{fontWeight: "400", color:"#49454F"}} >{offer.lugar}</Typography>
            <Button variant="contained" 
            sx={{position:"absolute", right:"50px", top:"40px"}} 
            disabled={!!offer.aplicando}
            onClick={()=>{setOpenModal(true)}}>
            Aplicar a oferta
            </Button>
        </Container>
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
                <Typography>{offer.descripcion}</Typography>
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
        
        <Dialog
        open={openModal}
        onClose={()=>{setOpenModal(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Aplicar a la oferta
            </DialogTitle>

            <DialogContent id="alert-dialog-description" sx={{width:"600px"}}>
                <Typography sx={{mb:2}}>
                    Estas a punto de aplicar a esta oferta, escribe un mensaje de por qué te gustaría obtener este puesto de trabajo...
                </Typography>
                <Box sx={{p:1}}>
                        <TextField
                    sx={{ width: "100%" }}
                    type="text"
                    label="Mensaje de solicitud"
                    placeholder="Cuentanos por qué te gustaría aplicar a esta oferta..."
                    name="applicationMessage"
                    value={applicationMessage}
                    multiline
                    rows={4}
                    onChange={(e)=>{setApplicationMessage(e.target.value)}}
                    />
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button size="medium" onClick={()=>{setOpenModal(false)}}>Cerrar</Button>
                <Button variant="contained" size="medium" onClick={applicateToOffer}>Aplicar</Button>
            </DialogActions>
        </Dialog>

        <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={()=>{setOpenNotification(false)}}
        message="Felicidades! Has aplicado a la oferta correctamente!"
        />
    </Container>
    );
}