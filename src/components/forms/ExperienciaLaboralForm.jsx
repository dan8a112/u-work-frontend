import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

const jobOptions = {
    puestoOcupado: [
        {
            id: "1",
            label: "Desarrollador"
        },
        {
            id: "2",
            label: "Gerente"  
        },
        {
            id: "3",
            label: "Analista"
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

export function ExperienciaLaboralForm(){
    
    const validations = {
      empresa: { required: true },
      fechaInicio: { required: true },
      fechaFinal: { required: true },
      puestoOcupado: { required: true },
      descripcion: { required: true},
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
        empresa: "",
        fechaInicio: "",
        fechaFinal: "",
        puestoOcupado: "",
        descripcion: "",
      });

    return (
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega una nueva experiencia
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          label="Empresa"
          placeholder="Empresa"
          name="empresa"
          value={formValues.empresa}
          onChange={handleChange}
          error={!!errors.empresa}
          helperText={errors.empresa}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Fecha Inicio"
          placeholder="Fecha Inicio"
          type="date"
          name="fechaInicio"
          value={formValues.fechaInicio}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaInicio}
          helperText={errors.fechaInicio}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          label="Fecha Final"
          placeholder="Fecha Final"
          type="date"
          name="fechaFinal"
          value={formValues.fechaFinal}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaFinal}
          helperText={errors.fechaFinal}
        />
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.puestoOcupado}>
          <InputLabel>Puesto Ocupado</InputLabel>
          <Select
            name="puestoOcupado"
            value={formValues.puestoOcupado}
            onChange={handleChange}
            label="Puesto Ocupado"
          >
            {jobOptions.puestoOcupado.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.puestoOcupado}</FormHelperText>
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
