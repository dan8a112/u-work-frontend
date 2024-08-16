import { Button, Container, Grid, Typography } from "@mui/material";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import { ItemsOfertaCard, ItemsOfertaDual } from "../cards/ItemsOfertaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export function OffersDetail(){

    const{offerId} = useParams();

    const [offer, setOffer] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/ofertas/detalle?idOferta=${offerId}&idSolicitante=1`
            );
            setOffer(response.data);
          } catch (error) {
            console.error(error);
          }
        }

        fetchData();
    }, []);
    

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
            <Button variant="contained" sx={{position:"absolute", right:"50px", top:"40px"}} disabled={offer.aplicando}>
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
    </Container>
    );
}