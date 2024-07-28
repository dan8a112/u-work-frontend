import { Container, Grid } from "@mui/material";
import { UserProfileCard } from "../cards/UserProfileCard";
import { UserInfoCard } from "../cards/UserInfoCard";
import { UserContentCard } from "../cards/UserContentCard";

const dataPrueba = {
    formacion: [
        {
            titulo: "Formacion Alura",
            empresa: "Alura Latam", 
            fechaExpedicion: "23 Sep, 2024",
            nivelAcademico: "Cursos"
        }
    ],
    historialMedico: [
        {
            titulo: "Sindrome de Asma",
            descripcion: "He padecido de asma desde que era pequeño, sin embargo es algo que tengo controlado."
        }
    ]
}

export function UserProfile(){
    return(
        <Container sx={{paddingY: 4}} maxWidth="md">
            <Grid container spacing={6}>
                <Grid item xs={6}>
                <UserProfileCard userName="Daniel Ochoa" description="Estudiante de Ingenieria en Sistemas" place="Talanga, Francisco Morazan, Honduras"></UserProfileCard>
                </Grid>
                <Grid item xs={6}>
                <UserInfoCard phoneNumber="9483-2396" email="danyochoa@gmail.com" birthdate="Marzo 08, 2003"/>
                </Grid>
            </Grid>
            <UserContentCard title="Formacion Academica" contentType="academic" data={dataPrueba.formacion}></UserContentCard>
            <UserContentCard title="Historial Medico" contentType="medic" data={dataPrueba.historialMedico}></UserContentCard>
        </Container>
    );
}