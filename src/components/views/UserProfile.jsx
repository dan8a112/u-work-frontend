import { Container, Grid } from "@mui/material";
import { UserProfileCard } from "../cards/UserProfileCard";
import { UserInfoCard } from "../cards/UserInfoCard";
import { UserContentCard } from "../cards/UserContentCard";
import { HistorialAcademicoForm } from "../forms/HistorialAcademicoForm";

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
            titulo: "Asma",
            descripcion: "He padecido de la condicion de asma desde que era pequeño, sin embargo es algo que tengo controlado."
        }
    ],
    seguros: [
        {
            titulo: "Seguro Social", 
            fechaAfiliacion: "23 Jun, 2022", 
            fechaExpiracion: "23 Jun, 2026", 
            numeroAfiliacion: "IHSS-40329"
        }
    ],
    idiomas: [
        {
            titulo: "Inglés",
            nivel: "Avanzado"
        }
    ],
    experiencia: [
       {
            puesto: "Programador front-end",
            empresa: "Meta Platforms, Inc.",
            fechaInicio: "26 Abr, 2021",
            fechaFinal: "28 Nov, 2024"
       }
    ],
    familiares: [
        {
            nombre: "Juan Hernandez",
            identificacion: "0801-1994-02345",
            telefono: "+504 9412-2477",
            parentesco: "Primo"
        }
    ]
}

export function UserProfile(){
    return(
        <Container sx={{paddingY: 4, marginTop: 8}} maxWidth="md">
            <Grid container spacing={6}>
                <Grid item xs={6}>
                <UserProfileCard 
                userName="Daniel Ochoa" 
                description="Estudiante de Ingenieria en Sistemas" 
                place="Talanga, Francisco Morazan, Honduras"
                gender="Masculino"
                />
                </Grid>
                <Grid item xs={6}>
                <UserInfoCard 
                phoneNumber="9483-2396" 
                email="danyochoa@gmail.com" 
                birthdate="Marzo 08, 2003"/>
                </Grid>
            </Grid>
            <UserContentCard title="Formacion Academica" contentType="academic" data={dataPrueba.formacion}></UserContentCard>
            <UserContentCard title="Experiencia Laboral" contentType="experience" data={dataPrueba.experiencia}></UserContentCard>
            <UserContentCard title="Idiomas" contentType="languages" data={dataPrueba.idiomas}></UserContentCard>
            <UserContentCard title="Seguros" contentType="secure" data={dataPrueba.seguros}></UserContentCard>
            <UserContentCard title="Familiares" contentType="familiar" data={dataPrueba.familiares}></UserContentCard>
            <UserContentCard title="Historial Medico" contentType="medic" data={dataPrueba.historialMedico}></UserContentCard>
        </Container>
    );
}