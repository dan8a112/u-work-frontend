import { Container, Grid, Typography } from "@mui/material";
import { UserProfileCard } from "../cards/UserProfileCard";
import { UserInfoCard } from "../cards/UserInfoCard";
import { UserContentCard } from "../cards/UserContentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { DetalleOfertaCard } from "../cards/DetalleOfertaCard";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function UserProfile({from, action}){

    const [datosPersonales, setDatosPersonales] = useState(null);
    const [formacion, setFormacion] = useState(null);
    const [historialMedico, setHistorialMedico] = useState(null);
    const [seguros, setSeguros] = useState(null);
    const [idiomas, setIdiomas] = useState(null);
    const [experiencia, setExperiencia] = useState(null);
    const [familiares, setFamiliares] = useState(null);

    const { idApplicant, idSolicitud, idOferta } = useParams(); // Destructuración correcta

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/perfil/${idApplicant}`);
                setDatosPersonales(response.data.datosPersonales);
                setFormacion(response.data.formacion);
                setHistorialMedico(response.data.historialMedico);
                setSeguros(response.data.seguros);
                setIdiomas(response.data.idiomas);
                setExperiencia(response.data.experiencia);
                setFamiliares(response.data.familiares);
            } catch(error){
                console.error(error);
            }
        } 
        fetchData();
    }, [idApplicant]); // Añadido idApplicant como dependencia

    if (!datosPersonales) {
        return <p>Cargando...</p>;
    }

    return(
        <Container sx={{paddingY: 4, marginTop: 8}} maxWidth="md">
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <UserProfileCard 
                        userName={datosPersonales.nombre}
                        description={datosPersonales.titular} 
                        place={datosPersonales.lugarResidencia}
                        gender="Masculino"
                    />
                </Grid>
                <Grid item xs={6}>
                    <UserInfoCard 
                        phoneNumber={datosPersonales.telefono} 
                        email={datosPersonales.correo}
                        birthdate={datosPersonales.fechaNacimiento}
                        from={from}
                        action={action}
                        idSolicitud={idSolicitud}
                        idOferta={idOferta}
                    />
                </Grid>
            </Grid>
            <DetalleOfertaCard title="DESCRIPCIÓN">
                <Typography>{datosPersonales.descripcion}</Typography>
            </DetalleOfertaCard>
            <UserContentCard 
                title="Formación Académica" 
                contentType="academic" 
                data={formacion} 
                from={from} 
                changeData={setFormacion}
            />
            <UserContentCard 
                title="Experiencia Laboral" 
                contentType="experience" 
                data={experiencia} 
                from={from} 
                changeData={setExperiencia}
            />
            <UserContentCard 
                title="Idiomas" 
                contentType="languages" 
                data={idiomas} 
                from={from} 
                changeData={setIdiomas}
            />
            <UserContentCard 
                title="Seguros" 
                contentType="secure" 
                data={seguros} 
                from={from} 
                changeData={setSeguros}
            />
            <UserContentCard 
                title="Familiares" 
                contentType="familiar" 
                data={familiares} 
                from={from} 
                changeData={setFamiliares}
            />
            <UserContentCard 
                title="Historial Médico" 
                contentType="medic" 
                data={historialMedico} 
                from={from} 
                changeData={setHistorialMedico}
            />
        </Container>
    );
}
