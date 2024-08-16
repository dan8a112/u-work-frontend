import { Box, Button, Container, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SectionFormCard } from "../cards/SectionFormCard";
import { ItemsOfertaCard, ItemsOfertaDual } from "../cards/ItemsOfertaCard";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";

const options = {
    tiposEmpleos: [
        {
            idTipoEmpleo: 1,
            tipoEmpleo: "Tecnologias de la informacion"
        },
        {
            idTipoEmpleo: 2,
            tipoEmpleo: "Banca y finanzas"
        }
    ],
    tiposContratos:[
        {
            idTipoContrato: 1,
            tipoContrato: "Temporal"
        },
        {
            idTipoContrato: 2,
            tipoContrato: "Permanente"
        }
    ],
    paises:[
        {
           idPais: 1,
           pais: 'Honduras' 
        },
        {
          idPais: 2,
          pais: "Nicaragua"
        }
    ],
    habilidadesRequeridas:[
        {
            idFormacionProfesional: 1,
            Formacion: "React"
        },
        {
            idFormacionProfesional: 2,
            Formacion: "Ingenieria en sistemas"
        }
    ],
    nivelesAcademicos: [
        {
          idNivelAcademico:1,
          nivelAcademico: "Educacion Basica"
        },
        {
          idNivelAcademico: 2,
          nivelAcademico: "Educacion Secundaria"
        },
        {
          idNivelAcademico: 3,
          nivelAcademico: "Educacion superior (pregrado)"
        }
    ],
    modalidades: [
      {
        idModalidad: 1,
        modalidad: "Remoto"
      },
      {
        idModalidad: 2,
        modalidad: "Presencial"
      }
    ],
    puestos: [
        {
            idPuesto: 1,
            puesto: "Consultor de sistemas"
        },
        {
            idPuesto: 2,
            puesto: "Programador frontEnd"
        }
    ],
    idiomas: [
        {
            idIdioma: 1,
            idioma: "Ingles"
        },
        {
            idIdioma: 2,
            idioma: "Español"
        }
    ],
    niveles: [
        {
            idNivel: 1,
            nivel: "Basico"
        },
        {
            idNivel: 2,
            nivel: "Intermedio"
        },
        {
            idNivel: 3,
            nivel: "Avanzado"
        }
    ]
}

export function CreateOffer(){

    const [showDepartments, setShowDepartments] = useState(false);


    const [formValues, setFormValues] = useState({
        titulo: "",
        plazasDisponibles: "",
        fechaExpiracion: "",
        descripcion: "",
        tipoEmpleo: "",
        tipoContrato: "",
        nivelAcademico: "",
        modalidad: "",
        puestos: [],
        pais: "",
        departamento: "",
        municipio: "",
        idiomas: []
    })

    const data = {
      titulo: "Programador backend con habilidades en nextjs",
      plazasDisponibles: 2,
      fechaExpiracion: "2024-08-14",
      descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dicta dignissimos sint expedita maiores nulla fugiat",
      tipoEmpleo: 1,
      tipoContrato: 1,
      nivelAcademico: 2,
      modalidad: 1,
      puestos: [1,2,3],
      lugar: 3,
      idiomas: [
        {idIdioma: 1, idNivelIdioma: 2},
        {idIdioma: 2, idNivelIdioma: 1}
      ]
    }

    const [idioma, setIdioma] = useState("");
    const [nivelIdioma, setNivelIdioma] = useState("");

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleAddIdioma= ()=>{
      const newIdioma = {
        idIdioma: idioma,
        idNivelIdioma: nivelIdioma
      }

      setFormValues({
        ...formValues,
        idiomas: [... formValues.idiomas, newIdioma]
      })

      setIdioma("")
      setNivelIdioma("")

      console.log(formValues.idiomas)
    }

    const handleDeleteIdioma = (indexSelected)=>{
      setFormValues({
        ...formValues,
        idiomas: formValues.idiomas.filter((_,index)=>index!=indexSelected)
      })
    }

    useEffect(()=>{
      if (formValues.pais == 1) {
        setShowDepartments(true);
      }else{
        setShowDepartments(false);
      }
    },[formValues.pais])

    return (
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Typography variant="h4">Crea una oferta</Typography>
        <form action="">
          <SectionFormCard title="Informacion General">
            <TextField
              label="Titulo"
              placeholder="Titulo de la oferta"
              size="small"
              name="titulo"
              value={formValues.titulo}
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Plazas disponibles"
                  placeholder="Numero de plazas"
                  type="number"
                  name="plazasDisponibles"
                  value={formValues.plazasDisponibles}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Fecha de expiracion"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  name="fechaExpiracion"
                  value={formValues.fechaExpiracion}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              label="Descripcion"
              placeholder="Escribe una descripcion de la informacion de la oferta"
              size="small"
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </SectionFormCard>
          <SectionFormCard title="Detalles de la oferta">

            <FormControl fullWidth size="small">
              <InputLabel id="tipoEmpleo">Tipo de empleo</InputLabel>
              <Select 
              labelId="tipoEmpleo" 
              label="Tipo de empleo"
              name="tipoEmpleo"
              value={formValues.tipoEmpleo}
              onChange={handleChange}>
                {options.tiposEmpleos.map((value)=><MenuItem key={value.idTipoEmpleo} value={value.idTipoEmpleo}>{value.tipoEmpleo}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="tipoContrato">Tipo de contrato</InputLabel>
              <Select 
              labelId="tipoContrato" 
              label="Tipo de contrato"
              name="tipoContrato"
              value={formValues.tipoContrato}
              onChange={handleChange}
              >
                {options.tiposContratos.map((value)=><MenuItem key={value.idTipoContrato} value={value.idTipoContrato}>{value.tipoContrato}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="nivelAcademico">Nivel Academico</InputLabel>
              <Select 
              labelId="nivelAcademico" 
              label="Nivel Academico"
              name="nivelAcademico"
              value={formValues.nivelAcademico}
              onChange={handleChange}
              >
                {options.nivelesAcademicos.map((value)=><MenuItem key={value.idNivelAcademico} value={value.idNivelAcademico}>{value.nivelAcademico}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="modalidad">Modalidad</InputLabel>
              <Select 
              labelId="modalidad" 
              label="Modalidad"
              name="modalidad"
              value={formValues.modalidad}
              onChange={handleChange}
              >
                {options.modalidades.map((value)=><MenuItem key={value.idModalidad} value={value.idModalidad}>{value.modalidad}</MenuItem>)}                
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="puestos">Puestos de la oferta</InputLabel>
              <Select 
              labelId="puestos" 
              label="Puestos de la oferta"
              name="puestos"
              value={formValues.puestos}
              onChange={handleChange}
              multiple
              >
              {options.puestos.map((value)=><MenuItem key={value.idPuesto} value={value.idPuesto}>{value.puesto}</MenuItem>)}                
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="pais">Pais</InputLabel>
              <Select 
              labelId="pais" 
              label="Pais"
              name="pais"
              value={formValues.pais}
              onChange={handleChange}
              >
              {options.paises.map((value)=><MenuItem key={value.idPais} value={value.idPais}>{value.pais}</MenuItem>)}                
              </Select>
            </FormControl>

            {showDepartments && (
                <FormControl fullWidth size="small">
              <InputLabel id="departamento">Departamento</InputLabel>
              <Select 
              labelId="departamento" 
              label="Departamento"
              name="departamento"
              value={formValues.departamento}
              onChange={handleChange}
              >
              {options.paises.map((value)=><MenuItem key={value.idPais} value={value.idPais}>{value.pais}</MenuItem>)}                
              </Select>
            </FormControl>)}

            {showDepartments && (
                <FormControl fullWidth size="small">
              <InputLabel id="departamento">Departamento</InputLabel>
              <Select 
              labelId="departamento" 
              label="Departamento"
              name="departamento"
              value={formValues.departamento}
              onChange={handleChange}
              >
              {options.paises.map((value)=><MenuItem key={value.idPais} value={value.idPais}>{value.pais}</MenuItem>)}                
              </Select>
            </FormControl>)}

          </SectionFormCard>

          <SectionFormCard title="Requisitos de la oferta">

            <FormControl fullWidth size="small">
              <InputLabel id="habilidadRequerida">
                Habilidades Requeridas
              </InputLabel>
              <Select
                labelId="habilidadRequerida"
                label="Habilidades Requeridas"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="experienciaLaboral">
                Experiencia laboral
              </InputLabel>
              <Select labelId="experienciaLaboral" label="Experiencia laboral">
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
            
            <Grid container spacing={2}>
              <Grid item xs={5.5}>
                <FormControl fullWidth size="small">
                  <InputLabel id="idioma">Idioma</InputLabel>
                  <Select 
                  labelId="idioma" 
                  label="Idioma"
                  name="idioma"
                  value={idioma}
                  onChange={(e)=>{setIdioma(e.target.value)}}
                  >
              {options.idiomas.map((value)=><MenuItem key={value.idIdioma} value={value.idIdioma}>{value.idioma}</MenuItem>)}                
              </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5.5}>
                <FormControl fullWidth size="small">
                  <InputLabel id="nivel">Nivel</InputLabel>
                  <Select 
                  labelId="nivel" 
                  label="Nivel"
                  name="nivelIdioma"
                  value={nivelIdioma}
                  onChange={(e)=>{setNivelIdioma(e.target.value)}}
                  >
              {options.niveles.map((value)=><MenuItem key={value.idNivel} value={value.idNivel}>{value.nivel}</MenuItem>)}                
              </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton sx={{bgcolor:"#F1FAF9"}} onClick={handleAddIdioma}>
                  <Add color="primary"></Add>
                </IconButton>
              </Grid>
            </Grid>
            <Box sx={{display: "flex", gap:"10px", flexWrap:"wrap"}}>
            {formValues.idiomas.length > 0 && formValues.idiomas.map((value, index)=>
            <Box  key={index} sx={{display:"flex"}}>
            <ItemsOfertaDual
            itemName={options.idiomas.find(i => i.idIdioma === value.idIdioma).idioma} 
            detail={options.niveles.find(i => i.idNivel === value.idNivelIdioma).nivel}/>
            <IconButton onClick={()=>{handleDeleteIdioma(index)}}>
              <Delete color="error"></Delete>
            </IconButton>
            </Box>
            )}
            </Box>
          </SectionFormCard>
          <Box sx={{display:"flex", justifyContent:"end", margin: "50px 45px 40px"}}>
            <Button size="large" variant="contained" onClick={()=>{console.log(formValues)}}>Crear Oferta</Button>
          </Box>
        </form>
      </Container>
    );
}