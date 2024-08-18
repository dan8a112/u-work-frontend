import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, Grid} from "@mui/material";
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

export function FamiliaresForm({changeData, handleClose}){

    const [generos, setGeneros] = useState(null); 
    const [parentescos, setParentescos] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const generosRes = await axios.get(
            `${apiUrl}/api/tablas/mantenimiento/admin/genero/mostrar`
          );

          const parentescosRes = await axios.get(
            `${apiUrl}/api/tablas/mantenimiento/admin/parentesco/mostrar`
          );

          setGeneros(generosRes.data)
          setParentescos(parentescosRes.data)
          setSuccess(true);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    },[])
    
    const validations = {
      primerNombre: { required: true },
      segundoNombre: { required: false },
      primerApellido: { required: true },
      segundoApellido: { required: false },
      telefono: { required: true },
      identificacion: { required: true },
      idGenero: { required: true },
      idParentesco: { required: true },
    };
  
    const { errors, validateForm, resetForm } = useFormValidation(validations);
  
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
            `${apiUrl}/api/usuario/agg-familiar-solicitante/${idApplicant}`,
            formValues
          )
          if (response.status ===200) {

            changeData(prevState => {
              const newItem = {
                nombre: `${formValues.primerNombre} ${formValues.primerApellido}`, 
                identificacion: formValues.identificacion, 
                telefono: formValues.telefono, 
                parentesco: parentescos.find(parentesco=>parentesco.id_parentescos == formValues.idParentesco).parentesco
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
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        telefono: "",
        identificacion: "",
        idGenero: "",
        idParentesco: "",
      });

    return (success &&
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
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.idGenero}>
          <InputLabel>Género</InputLabel>
          <Select
            name="idGenero"
            value={formValues.idGenero}
            onChange={handleChange}
            label="Género"
          >
            {generos.map((value, index) => (
              <MenuItem value={value.id_genero} key={index}>
                {value.genero}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.idGenero}</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.idParentesco}>
          <InputLabel>Parentesco</InputLabel>
          <Select
            name="idParentesco"
            value={formValues.idParentesco}
            onChange={handleChange}
            label="Parentesco"
          >
            {parentescos.map((value, index) => (
              <MenuItem value={value.id_parentescos} key={index}>
                {value.parentesco}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.idParentesco}</FormHelperText>
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
