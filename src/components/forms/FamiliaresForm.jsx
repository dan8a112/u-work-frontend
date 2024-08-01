import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, Grid} from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

const genderOptions = {
    genero: [
        {
            id: "1",
            label: "Masculino"
        },
        {
            id: "2",
            label: "Femenino"
        },
        {
            id: "3",
            label: "Otro"
        }
    ]
};

const relationshipOptions = {
    parentesco: [
        {
            id: "1",
            label: "Padre"
        },
        {
            id: "2",
            label: "Madre"
        },
        {
            id: "3",
            label: "Hermano"
        },
        {
            id: "4",
            label: "Hermana"
        },
        {
            id: "5",
            label: "Cónyuge"
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

export function FamiliaresForm(){
    
    const validations = {
      primerNombre: { required: true },
      segundoNombre: { required: false },
      primerApellido: { required: true },
      segundoApellido: { required: false },
      telefono: { required: true },
      identificacion: { required: true },
      genero: { required: true },
      parentesco: { required: true },
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
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        telefono: "",
        identificacion: "",
        genero: "",
        parentesco: "",
      });

    return (
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega un nuevo familiar
        </Typography>
        <Grid container xs={{mt: 2}} spacing={1}>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              type="text"
              label="Primer Nombre"
              placeholder="Primer Nombre"
              name="primerNombre"
              value={formValues.primerNombre}
              onChange={handleChange}
              error={!!errors.primerNombre}
              helperText={errors.primerNombre}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              type="text"
              label="Segundo Nombre"
              placeholder="Segundo Nombre"
              name="segundoNombre"
              value={formValues.segundoNombre}
              onChange={handleChange}
              error={!!errors.segundoNombre}
              helperText={errors.segundoNombre}
            />
          </Grid>
        </Grid>
        <Grid container sx={{mt: 2}}  spacing={1}>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              type="text"
              label="Primer Apellido"
              placeholder="Primer Apellido"
              name="primerApellido"
              value={formValues.primerApellido}
              onChange={handleChange}
              error={!!errors.primerApellido}
              helperText={errors.primerApellido}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ width: "100%" }}
              type="text"
              label="Segundo Apellido"
              placeholder="Segundo Apellido"
              name="segundoApellido"
              value={formValues.segundoApellido}
              onChange={handleChange}
              error={!!errors.segundoApellido}
              helperText={errors.segundoApellido}
            />
          </Grid>
        </Grid>
        <TextField
          sx={{ mt: 2, width: "100%" }}
          type="text"
          label="Teléfono"
          placeholder="Teléfono"
          name="telefono"
          value={formValues.telefono}
          onChange={handleChange}
          error={!!errors.telefono}
          helperText={errors.telefono}
        />
        <TextField
          sx={{ mt: 2, width: "100%" }}
          type="text"
          label="Identificación"
          placeholder="Identificación"
          name="identificacion"
          value={formValues.identificacion}
          onChange={handleChange}
          error={!!errors.identificacion}
          helperText={errors.identificacion}
        />
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.genero}>
          <InputLabel>Género</InputLabel>
          <Select
            name="genero"
            value={formValues.genero}
            onChange={handleChange}
            label="Género"
          >
            {genderOptions.genero.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.genero}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.parentesco}>
          <InputLabel>Parentesco</InputLabel>
          <Select
            name="parentesco"
            value={formValues.parentesco}
            onChange={handleChange}
            label="Parentesco"
          >
            {relationshipOptions.parentesco.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.parentesco}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          sx={{ mt: 4, width: "100%" }}
          size="medium"
          onClick={handleSubmit}
        >
          Agregar
        </Button>
      </Box>
    );
}
