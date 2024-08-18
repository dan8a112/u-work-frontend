import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4
  };

  const apiUrl = import.meta.env.VITE_API_URL;

export function HistorialAcademicoForm({changeData, handleClose}){

  const [options, setOptions] = useState(null); 

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const nivelesAcad = await axios.get(
          `${apiUrl}/api/tablas/mantenimiento/admin/nivel-academico/mostrar`
        );
        const formacionesProf = await axios.get(
          `${apiUrl}/api/tablas/mantenimiento/admin/formacion-prof/mostrar`
        )

        setOptions({
          nivelAcademico: nivelesAcad.data,
          formacionProfesional: formacionesProf.data
        })
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[])
      
  const validations = {
      titulo: { required: true },
      fechaEgreso: { required: true },
      institucion: { required: true },
      idNivelAcademico: { required: true },
      idFormacionProf: { required: true },
  };
  
  const {errors, validateForm, resetForm} = useFormValidation(validations)
  
    const handleChange = (e)=>{
      const {name, value} = e.target;
      setFormValues({
          ...formValues,
          [name] : value
      });
    }

    const handleSubmit = async ()=>{
    const idApplicant = localStorage.getItem('idPersonaSoli');
      try {
        if(validateForm(formValues)){
          const response = await axios.post(
            `${apiUrl}/api/usuario/agg-historial-academico/${idApplicant}`,
            formValues
          )
          if (response.status ===200) {

            changeData(prevState => {
              const newItem = {
                titulo: formValues.titulo,
                empresa: formValues.institucion, 
                fechaExpedicion: formValues.fechaEgreso, 
                nivelAcademico: options.nivelAcademico.find(nivel=>nivel.idNivelAcademico == formValues.idNivelAcademico).nivelAcademico
              }
  
              return [...prevState, newItem];
            });
            handleClose();
            alert('Se ha agregado una nueva formaciona tu historial academico');
          }
        }
      } catch (error) {
        console.error(error);
      }
      
    }

    const [formValues, setFormValues] = useState({
        titulo: "",
        fechaEgreso: "",
        institucion: "",
        idNivelAcademico: "",
        idFormacionProf: "",
      });

    return (options &&
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega una nueva formacion
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          label="Titulo"
          placeholder="Titulo"
          name="titulo"
          value={formValues.titulo}
          onChange={handleChange}
          error={!!errors.titulo}
          helperText={errors.titulo}
        />
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.idNivelAcademico}>
          <InputLabel>Nivel Academico</InputLabel>
          <Select
            name="idNivelAcademico"
            value={formValues.idNivelAcademico}
            onChange={handleChange}
            label="Nivel Academico"
          >
            {options.nivelAcademico.map((value, index) => (
              <MenuItem value={value.idNivelAcademico} key={index}>
                {value.nivelAcademico}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.idNivelAcademico}</FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.idFormacionProf}
        >
          <InputLabel>Formacion Profesional</InputLabel>
          <Select
            name="idFormacionProf"
            value={formValues.idFormacionProf}
            onChange={handleChange}
            label="Formacion Profesional"
          >
            {options.formacionProfesional.map((value, index) => (
              <MenuItem value={value.idFormacionProfesional} key={index}>
                {value.formacionProfesional}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.idFormacionProf}</FormHelperText>
        </FormControl>
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Fecha de Egreso"
          placeholder="Fecha de egreso"
          type="date"
          name="fechaEgreso"
          value={formValues.fechaEgreso}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaEgreso}
          helperText={errors.fechaEgreso}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Institucion"
          placeholder="Institucion"
          type="text"
          name="institucion"
          value={formValues.institucion}
          onChange={handleChange}
          error={!!errors.institucion}
          helperText={errors.institucion}
        />
        <Button 
        variant="contained" 
        sx={{ mt: 4, width: "100%" }} 
        size="medium"
        onClick={handleSubmit}>
          Agregar
        </Button>
      </Box>
    );
}