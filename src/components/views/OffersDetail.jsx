import { Container, Grid, Typography } from "@mui/material";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import { ItemsOfertaCard, ItemsOfertaDual } from "../cards/ItemsOfertaCard";


const information = {
    nombreOferta: "Trabajo desde casa como ingeniero de software y manager de base de datos",
    urlEmpresa: "img/bac_logo.svg",
    nombreEmpresa: "BAC CREDOMATIC",
    fechaPublicacion: "17 Jun, 2024",
    fechaPublicacion: "31 Jun, 2024",
    lugar: "Tegucigalpa, Francisco Morazan, Honduras",
    detalle: {
        tipoEmpleo: "Tecnologias de la informacion",
        cargos: "Programador, DatabaseManager",
        vacantes: 1,
        tipoContratacion: "Tiempo completo",
        modalidad: "En remoto",
        nivelAcademico: "Educacion Superior"
    },
    descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis necessitatibus, assumenda quod dolorum explicabo laboriosam molestias et officiis magnam voluptates, rerum eligendi nemo dolore velit ipsam optio ipsa eum unde?",
    requisitosAcademicos: ["React", "Diseno Grafico", "MySQL"],
    experienciaRequerida: ["Programador Frontend", "Database Manager"],
    educacionRequerida: ["Ingenieria en Sistemas", "Administracion de empresas"],
    lenguajes: [{nombre: "Ingles", nivel:"Avanzado"},{nombre: "Espanol", nivel:"Nativo"}]
}

export function OffersDetail(){
    return(
    <Container sx={{padding: "30px", backgroundColor: "#F1FAF9", marginTop:10}} maxWidth="md" disableGutters>
        <Grid container gap={5} justifyContent="center" marginBottom="30px">
            <Grid item>
                <img src={information.urlEmpresa} alt="logo de empresa" style={{width:"200px"}}/>
            </Grid>
            <Grid item alignContent="center" xs={8}>
                <Typography variant="h5" fontWeight="600">
                    {information.nombreOferta}
                </Typography>
            </Grid>
        </Grid>
        <Typography fontSize="1.1rem" fontWeight="600" marginBottom={1}>{information.nombreEmpresa}</Typography>
        <Container sx={{pl: "20px", mb:"20px"}}>
            <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}}>Publicado  <span style={{fontWeight:"400"}}>{information.fechaPublicacion}</span></Typography>
            <Typography sx={{fontWeight: "500", color:"#49454F", mb:0.5}} >Expira <span style={{fontWeight:"400"}}>{information.fechaPublicacion}</span></Typography>
            <Typography sx={{fontWeight: "400", color:"#49454F"}} >{information.lugar}</Typography>
        </Container>
        <Container disableGutters>
            <DetalleOfertaCard
            title="DETALLE DE LA OFERTA">
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Tipo de Empleo</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{information.detalle.tipoEmpleo}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Cargos</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{information.detalle.cargos}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Puestos Vacantes</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{information.detalle.vacantes}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Modalidad</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{information.detalle.modalidad}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography sx={{fontWeight: "500",  mb:0.5}}>Nivel Academico</Typography>
                </Grid>
                <Grid item xs={9}>
                <Typography sx={{ mb:0.5}}>{information.detalle.nivelAcademico}</Typography>
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
            title="HABILIDADES REQUERIDAS">
                <Grid container columnSpacing={3}>
                    {information.requisitosAcademicos.map((value, index)=><><Grid item key={index}><ItemsOfertaCard itemName={value}/></Grid></>)}
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="EXPERIENCIA LABORAL REQUERIDA">
                <Grid container columnSpacing={3}>
                    {information.experienciaRequerida.map((value, index)=><><Grid item key={index}><ItemsOfertaCard itemName={value}/></Grid></>)}
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="EDUCACION">
                <Grid container columnSpacing={3}>
                    {information.educacionRequerida.map((value, index)=><><Grid item key={index}><ItemsOfertaCard itemName={value}/></Grid></>)}
                </Grid>
            </DetalleOfertaCard>
            <DetalleOfertaCard
            title="LENGUAJES">
                <Grid container columnSpacing={3}>
                    {information.lenguajes.map((value, index)=><><Grid item key={index}><ItemsOfertaDual itemName={value.nombre} detail={value.nivel}/></Grid></>)}
                </Grid>
            </DetalleOfertaCard>
        </Container>
    </Container>
    );
}