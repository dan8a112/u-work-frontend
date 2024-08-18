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

export function HistorialMedicoForm({changeData, handleClose}){

    const [condicionMed, setCondicionMed] = useState(null); 

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const condicionRes = await axios.get(
            `http://localhost:5001/api/tablas/mantenimiento/admin/condicion-medica/mostrar`
          );

          setCondicionMed(condicionRes.data)
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    },[])
    
    const validations = {
      descripcion: { required: true },
      tipoCondicionMedica: { required: true },
    };
  
    const { errors, validateForm} = useFormValidation(validations);
  
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
            `http://localhost:5001/api/usuario/agg-historial-medico-solicitante/${idApplicant}`,
            formValues
          )
          if (response.status ===200) {

            changeData(prevState => {
              const newItem = {
                titulo: condicionMed.find(condicion => condicion.idCondicioneMedica == formValues.tipoCondicionMedica).condicionMedicas, 
                descripcion: formValues.descripcion
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
        descripcion: "",
        tipoCondicionMedica: ""
      });

    return (condicionMed &&
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega una condicion medica
        </Typography>
        <FormControl fullWidth error={!!errors.tipoCondicionMedica}>
          <InputLabel>Tipo de condición médica</InputLabel>
          <Select
            name="tipoCondicionMedica"
            value={formValues.tipoCondicionMedica}
            onChange={handleChange}
            label="Tipo de condición médica"
          >
            {condicionMed.map((value, index) => (
              <MenuItem value={value.idCondicioneMedica} key={index}>
                {value.condicionMedicas}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.tipoCondicionMedica}</FormHelperText>
        </FormControl>
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Descripción"
          placeholder="Descripción"
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleChange}
          multiline
          rows={4}
          error={!!errors.descripcion}
          helperText={errors.descripcion}
          inputProps={{ maxLength: 300 }}
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
