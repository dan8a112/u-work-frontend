import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

const medicalOptions = {
    tipoCondicionMedica: [
        {
            id: "1",
            label: "Crónica"
        },
        {
            id: "2",
            label: "Aguda"  
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

export function HistorialMedicoForm(){
    
    const validations = {
      descripcion: { required: true },
      tipoCondicionMedica: { required: true },
    };
  
    const { errors, validateForm, resetForm } = useFormValidation(validations);
  
    const handleChange = (e)=>{
      const {name, value} = e.target;
      setFormValues({
          ...formValues,
          [name] : value
      });
    }

    const handleSubmit = ()=>{
      if(validateForm(formValues)){
        console.log("se envia formulario");
      }
    }

    const [formValues, setFormValues] = useState({
        descripcion: "",
        tipoCondicionMedica: "",
      });

    return (
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
            {medicalOptions.tipoCondicionMedica.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
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
