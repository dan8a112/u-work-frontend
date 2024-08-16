import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

const options = {
    nivelAcademico: [
        {
            id: "1",
            label: "Secundaria"
        },
        {
            id: "2",
            label: "Universidad"  
        }
    ],
    formacionProfesional: [
        {
            id: "1",
            label: "React"
        },
        {
            id: "2",
            label: "Javascript "  
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

export function HistorialAcademicoForm(){
    
    const validations = {
      titulo: { required: true },
      fechaEgreso: { required: true },
      institucion: { required: true },
      nivelAcademico: { required: true },
      formacionProfesional: { required: true },
    };
  
  const {errors, validateForm, resetForm} = useFormValidation(validations)
  
    const handleChange = (e)=>{
      const {name, value} = e.target;
      setFormValues({
          ...formValues,
          [name] : value
      });
    }

    const handleSubmit = ()=>{
      if(validateForm(formValues)){
        
      }
    }

    const [formValues, setFormValues] = useState({
        titulo: "",
        fechaEgreso: "",
        institucion: "",
        nivelAcademico: "",
        formacionProfesional: "",
      });

    return (
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
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.nivelAcademico}>
          <InputLabel>Nivel Academico</InputLabel>
          <Select
            name="nivelAcademico"
            value={formValues.nivelAcademico}
            onChange={handleChange}
            label="Nivel Academico"
          >
            {options.nivelAcademico.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.nivelAcademico}</FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.formacionProfesional}
        >
          <InputLabel>Formacion Profesional</InputLabel>
          <Select
            name="formacionProfesional"
            value={formValues.formacionProfesional}
            onChange={handleChange}
            label="Formacion Profesional"
          >
            {options.formacionProfesional.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.formacionProfesional}</FormHelperText>
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