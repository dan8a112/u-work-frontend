import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import axios from "axios";

const levelOptions = {
    nivel: [
        {
            id: "1",
            label: "Básico"
        },
        {
            id: "2",
            label: "Intermedio"  
        },
        {
            id: "3",
            label: "Avanzado"
        }
    ]
};

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

export function IdiomasForm({changeData, handleClose}){
    
    const [levels, setLevels] = useState(null); 
    const [idiomas, setIdiomas] = useState(null); 

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const niveles = await axios.get(
            `http://localhost:5001/api/tablas/mantenimiento/admin/nivel-idioma/mostrar`
          );

          const idiomas = await axios.get(
            `http://localhost:5001/api/tablas/mantenimiento/admin/idioma/mostrar`
          );

          setLevels(niveles.data)
          setIdiomas(idiomas.data)
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    },[])

    const validations = {
      idioma: { required: true },
      nivel: { required: true },
    };
  
    const { errors, validateForm} = useFormValidation(validations);
  
    const handleChange = (e)=>{
      const { name, value } = e.target;
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
            `http://localhost:5001/api/usuario/agg-solicitante-idioma/${idApplicant}`,
            formValues
          )
          if (response.status ===200) {

            changeData(prevState => {
              const newItem = {
                titulo: idiomas.find(idioma=> idioma.idIdioma === formValues.idioma).idioma,
                nivel: levels.find(nivel=> nivel.idNivelIdioma === formValues.nivel).nivelIdioma,
              }
  
              return [...prevState, newItem];
            });
            handleClose();
            alert('Se ha agregado un nuevo elemento a tu perfil, revisalo!');
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    const [formValues, setFormValues] = useState({
        idioma: "",
        nivel: "",
      });

    return (
      (levels && idiomas) &&
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega un idioma
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.idioma}>
          <InputLabel>Idioma</InputLabel>
          <Select
            name="idioma"
            value={formValues.idioma}
            onChange={handleChange}
            label="Idioma"
          >
            {idiomas.map((value, index) => (
              <MenuItem value={value.idIdioma} key={index}>
                {value.idioma}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.idioma}</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.nivel}>
          <InputLabel>Nivel</InputLabel>
          <Select
            name="nivel"
            value={formValues.nivel}
            onChange={handleChange}
            label="Nivel"
          >
            {levels.map((value, index) => (
              <MenuItem value={value.idNivelIdioma} key={index}>
                {value.nivelIdioma}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.nivel}</FormHelperText>
        </FormControl>
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
