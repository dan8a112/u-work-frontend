import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

const options = {
    tipoSeguros: [
        {
            id: "1",
            label: "Salud"
        },
        {
            id: "2",
            label: "Vida"  
        },
        {
            id: "3",
            label: "Auto"
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

export function SegurosForm(){
    
    const validations = {
      tipoSeguros: { required: true },
      fechaAfiliacion: { required: true },
      fechaExpiracion: { required: true },
      numeroAfiliacion: { required: true },
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
        tipoSeguros: "",
        fechaAfiliacion: "",
        fechaExpiracion: "",
        numeroAfiliacion: "",
      });

    return (
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega un seguro
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.tipoSeguros}>
          <InputLabel>Tipo de Seguros</InputLabel>
          <Select
            name="tipoSeguros"
            value={formValues.tipoSeguros}
            onChange={handleChange}
            label="Tipo de Seguros"
          >
            {options.tipoSeguros.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.tipoSeguros}</FormHelperText>
        </FormControl>
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Fecha de afiliación"
          placeholder="Fecha de afiliación"
          type="date"
          name="fechaAfiliacion"
          value={formValues.fechaAfiliacion}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaAfiliacion}
          helperText={errors.fechaAfiliacion}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Fecha de expiración"
          placeholder="Fecha de expiración"
          type="date"
          name="fechaExpiracion"
          value={formValues.fechaExpiracion}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaExpiracion}
          helperText={errors.fechaExpiracion}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Número de afiliación"
          placeholder="Número de afiliación"
          type="text"
          name="numeroAfiliacion"
          value={formValues.numeroAfiliacion}
          onChange={handleChange}
          error={!!errors.numeroAfiliacion}
          helperText={errors.numeroAfiliacion}
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
