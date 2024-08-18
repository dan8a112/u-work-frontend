import { Box, Button, Container, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SectionFormCard } from "../cards/SectionFormCard";
import { ItemsOfertaDual } from "../cards/ItemsOfertaCard";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function CreateOffer({edit}){

  const {idOffer} = useParams();

  const navigate = useNavigate()

  const [options, setOptions] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const optionsRes = await axios.get(`${apiUrl}/api/crearOferta/info`);
          setOptions(optionsRes.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchToEdit = async () => {
        try {
          const offerData = await axios.get(`${apiUrl}/api/ofertas/obtener/${idOffer}`);
          setFormValues(offerData.data);
          console.log(offerData.data)
        } catch (error) {
          console.error(error);
        }
      };

      if (edit) {
        fetchToEdit();
      }
  
      fetchData();

    }, []);


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
        requisitosAcademicos: [],
        experienciaLaboral: [],
        idiomas: []
    })

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
    }

    const handleDeleteIdioma = (indexSelected)=>{
      setFormValues({
        ...formValues,
        idiomas: formValues.idiomas.filter((_,index)=>index!=indexSelected)
      })
    }

    const [showDepartments, setShowDepartments] = useState(false);
    const [departamentsData, setDepartamentsData] = useState([]);
    const [municipiosData, setMunicipiosData] = useState([]);

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/lugares/dep`
          );
          setDepartamentsData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      if (formValues.pais == 1) {
        fetchData();
        setShowDepartments(true);
      }else{
        setShowDepartments(false);
      }
    },[formValues.pais])

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/lugares/mun/${formValues.departamento}`
          );
          setMunicipiosData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (formValues.departamento) {
        fetchData();
      }
    }, [formValues.departamento])


    //Funcion que envia el formulario
    const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        const formSubmit = {... formValues};

        const idEmpresa = localStorage.getItem('idEmpresa');
  
        //Logica para enviar departamento o municipio en caso que se haya elegido
        if (formSubmit.departamento != "") {
          formSubmit.lugar = formSubmit.departamento;
          delete formSubmit.pais;
          delete formSubmit.departamento;
          if (formSubmit.municipio != "") {
              formSubmit.lugar = formSubmit.municipio;
              delete formSubmit.municipio;
          }
        }

      const url = edit
        ? `${apiUrl}/api/ofertas/editar/${idEmpresa}`
        : `${apiUrl}/api/ofertas/ingresar/${idEmpresa}`;
      
      const response = await axios[edit ? 'put' : 'post'](url, formSubmit);
      
      if (response.status === 200) {
        alert(edit ? 'Se ha editado tu oferta correctamente, revisalo!' : 'Se ha agregado una nueva oferta, revisalo!');
        navigate(`/OffersEnterprise/${idEmpresa}`);
      }
      
      } catch (error) {
        console.error(error);
      }

    }

    return (options &&
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Typography variant="h4">Crea una oferta</Typography>
        <form onSubmit={handleSubmit}>
          <SectionFormCard title="Informacion General">
            <TextField
              label="Titulo"
              placeholder="Titulo de la oferta"
              size="small"
              name="titulo"
              value={formValues.titulo}
              onChange={handleChange}
              required
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
                  required
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
                  required
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
              required
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
              onChange={handleChange}
              required>
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
              required
              >
                {options.tiposContratos.map((value)=><MenuItem key={value.idContrato} value={value.idContrato}>{value.contrato}</MenuItem>)}
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
              required
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
              required
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
              required
              >
              {options.puestos.map((value)=><MenuItem key={value.id_puesto} value={value.id_puesto}>{value.puesto}</MenuItem>)}                
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
              required
              >
              {options.paises.map((value)=><MenuItem key={value.id_lugar} value={value.id_lugar}>{value.nombre_lugar}</MenuItem>)}                
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
              required
              >
              {departamentsData.map((value)=><MenuItem key={value.id_lugar} value={value.id_lugar}>{value.nombre_lugar}</MenuItem>)}                
              </Select>
            </FormControl>)}

            {showDepartments && (
                <FormControl fullWidth size="small">
              <InputLabel id="municipio">Municipio</InputLabel>
              <Select 
              labelId="municipio" 
              label="Departamento"
              name="municipio"
              value={formValues.municipio}
              onChange={handleChange}
              required
              >
              {municipiosData.map((value)=><MenuItem key={value.id_lugar} value={value.id_lugar}>{value.nombre_lugar}</MenuItem>)}                
              </Select>
            </FormControl>)}

          </SectionFormCard>

          <SectionFormCard title="Requisitos de la oferta">

            <FormControl fullWidth size="small">
              <InputLabel id="requisitosAcademicos">
                Habilidades Requeridas
              </InputLabel>
              <Select
              labelId="requisitosAcademicos" 
              label="Requisitos Academicos"
              name="requisitosAcademicos"
              value={formValues.requisitosAcademicos}
              onChange={handleChange}
              multiple
              required
              >
              {options.formacionesAcademicas.map((value)=><MenuItem key={value.idFormacionProfesional} value={value.idFormacionProfesional}>{value.formacionProfesional}</MenuItem>)}                
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="experienciaLaboral">
                Experiencia laboral
              </InputLabel>
              <Select
              labelId="experienciaLaboral" 
              label="Experiencia Laboral"
              name="experienciaLaboral"
              value={formValues.experienciaLaboral}
              onChange={handleChange}
              multiple
              required
              >
              {options.puestos.map((value, index)=><MenuItem key={index} value={value.id_puesto}>{value.puesto}</MenuItem>)}
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
              {options.nivelIdioma.map((value)=><MenuItem key={value.idNivelIdioma} value={value.idNivelIdioma}>{value.nivelIdioma}</MenuItem>)}                
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
            detail={options.nivelIdioma.find(i => i.idNivelIdioma === value.idNivelIdioma).nivelIdioma}/>
            <IconButton onClick={()=>{handleDeleteIdioma(index)}}>
              <Delete color="error"></Delete>
            </IconButton>
            </Box>
            )}
            </Box>
          </SectionFormCard>
          <Box sx={{display:"flex", justifyContent:"end", margin: "50px 45px 40px"}}>
            <Button size="large" variant="contained" type="submit">Crear Oferta</Button>
          </Box>
        </form>
      </Container>
    );
}