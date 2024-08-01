import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

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

export function IdiomasForm(){
    
    const validations = {
      idioma: { required: true },
      nivel: { required: true },
    };
  
    const { errors, validateForm, resetForm } = useFormValidation(validations);
  
    const handleChange = (e)=>{
      const { name, value } = e.target;
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
        idioma: "",
        nivel: "",
      });

    return (
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega un idioma
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          label="Idioma"
          placeholder="Idioma"
          name="idioma"
          value={formValues.idioma}
          onChange={handleChange}
          error={!!errors.idioma}
          helperText={errors.idioma}
        />
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.nivel}>
          <InputLabel>Nivel</InputLabel>
          <Select
            name="nivel"
            value={formValues.nivel}
            onChange={handleChange}
            label="Nivel"
          >
            {levelOptions.nivel.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
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
