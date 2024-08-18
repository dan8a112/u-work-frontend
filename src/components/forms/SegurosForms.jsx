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

export function SegurosForm({changeData, handleClose}){

    const [tipoSeguros, setTipoSeguros] = useState(null); 

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const tipoSeg = await axios.get(
            `http://localhost:5001/api/tablas/mantenimiento/admin/tipo-seguro/mostrar`
          );

          setTipoSeguros(tipoSeg.data)
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    },[])

    
    const validations = {
      tipoSeguro: { required: true },
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

    const handleSubmit = async ()=>{
      const idApplicant = localStorage.getItem('idPersonaSoli');
      try {
        if(validateForm(formValues)){
          const response = await axios.post(
            `http://localhost:5001/api/usuario/agg-seguro-solicitante/${idApplicant}`,
            formValues
          )
          if (response.status ===200) {

            changeData(prevState => {
              const newItem = {
                titulo: tipoSeguros.find(tipo => tipo.idTipoSeguro == formValues.tipoSeguro).tipoSeguro,
                fechaAfiliacion: formValues.fechaAfiliacion, 
                fechaExpiracion: formValues.fechaExpiracion, 
                numeroAfiliacion: formValues.numeroAfiliacion
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
        tipoSeguro: "",
        fechaAfiliacion: "",
        fechaExpiracion: "",
        numeroAfiliacion: "",
      });

    return (tipoSeguros &&
      <Box sx={style}>
        <Typography variant="h6" marginBottom={3}>
          Agrega un seguro
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.tipoSeguro}>
          <InputLabel>Tipo de Seguros</InputLabel>
          <Select
            name="tipoSeguro"
            value={formValues.tipoSeguro}
            onChange={handleChange}
            label="Tipo de Seguros"
          >
            {tipoSeguros.map((value, index) => (
              <MenuItem value={value.idTipoSeguro} key={index}>
                {value.tipoSeguro}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.tipoSeguro}</FormHelperText>
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
