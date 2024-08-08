import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Step1 = ({handleChange, values, options, errors}) => (
    <Box>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Primer Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="primerNombre"
          value={values.primerNombre}
          onChange={handleChange}
          error={!!errors.primerNombre}
          helperText={errors.primerNombre}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Segundo Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="segundoNombre"
          value={values.segundoNombre}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Primer Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          name="primerApellido"
          value={values.primerApellido}
          onChange={handleChange}
          error={!!errors.primerApellido}
          helperText={errors.primerApellido}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Segundo Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          name="segundoApellido"
          value={values.segundoApellido}
          onChange={handleChange}
          error={!!errors.segundoApellido}
          helperText={errors.segundoApellido}
        />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Identificacion"
          variant="outlined"
          fullWidth
          margin="normal"
          name="identificacion"
          value={values.identificacion}
          onChange={handleChange}
          error={!!errors.identificacion}
          helperText={errors.identificacion}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Fecha de nacimiento"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fechaNacimiento"
          value={values.fechaNacimiento}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.fechaNacimiento}
          helperText={errors.fechaNacimiento}
        />
      </Grid>
    </Grid>
    <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.nacionalidad}>
      <InputLabel>Nacionalidad</InputLabel>
      <Select
        name="nacionalidad"
        value={values.nacionalidad}
        onChange={handleChange}
        label="Nacionalidad"
      >
        {options.lugares.map((value, index) => (
            <MenuItem value={value.id_lugar} key={index}>{value.nombre_lugar}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.nacionalidad}</FormHelperText>
    </FormControl>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.genero}>
          <InputLabel>Genero</InputLabel>
          <Select
            name="genero"
            value={values.genero}
            onChange={handleChange}
            label="Genero"
          >
            {options.generos.map((value, index) => (
            <MenuItem value={value.id_genero} key={index}>{value.genero}</MenuItem>
             ))}
          </Select>
          <FormHelperText>{errors.genero}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.estadoCivil}>
          <InputLabel>Estado Civil</InputLabel>
          <Select
            name="estadoCivil"
            value={values.estadoCivil}
            onChange={handleChange}
            label="Estado Civil"
          >
            {options.estadoCivil.map((value, index) => (
            <MenuItem value={value.id_estado_civil} key={index}>{value.estado_civil}</MenuItem>
             ))}
          </Select>
          <FormHelperText>{errors.estadoCivil}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  </Box>
);

const Step2 = ({handleChange, values, errors}) => (
    <Box>
    <TextField
          label="Correo Electronico"
          variant="outlined"
          fullWidth
          margin="normal"
          name="correo"
          value={values.correo}
          onChange={handleChange}
          error={!!errors.correo}
          helperText={errors.correo}
    />
    <TextField
          type="password"
          label="Contraseña"
          variant="outlined"
          fullWidth
          margin="normal"
          name="contrasena"
          value={values.contrasena}
          onChange={handleChange}
          error={!!errors.contrasena}
          helperText={errors.contrasena}
    />
  </Box>
);

const Step3 = ({handleChange, values, options}) => {

  const [departamentsData, setDepartamentsData] = useState([]);
  const [municipiosData, setMunicipiosData] = useState([]);
  const [showDepartments, setShowDepartments] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/lugares/dep"
        );
        setDepartamentsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if(values.paisResidencia==1){
      fetchData();
      setShowDepartments(true)
    }else{
      setShowDepartments(false)
    }
  }, [values.paisResidencia])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/lugares/mun/${values.departamentoResidencia}`
        );
        setMunicipiosData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (values.departamentoResidencia) {
      fetchData();
    }
  }, [values.departamentoResidencia])

  return(
  <Box>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Pais de residencia</InputLabel>
      <Select
        name="paisResidencia"
        value={values.paisResidencia}
        onChange={handleChange}
        label="Pais de Residencia"
      >
        {options.lugares.map((value, index) => (
            <MenuItem value={value.id_lugar} key={index}>{value.nombre_lugar}</MenuItem>
        ))}
      </Select>
    </FormControl>
    {showDepartments && (
      <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Departamento de residencia</InputLabel>
      <Select
        name="departamentoResidencia"
        value={values.departamentoResidencia}
        onChange={handleChange}
        label="Departamento de Residencia"
      >
        {departamentsData.map((value, index) => (
            <MenuItem value={value.id_lugar} key={index}>{value.nombre_lugar}</MenuItem>
        ))}
      </Select>
    </FormControl>)}
    {showDepartments && (
      <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Municipio de residencia</InputLabel>
      <Select
        name="municipioResidencia"
        value={values.municipioResidencia}
        onChange={handleChange}
        label="Departamento de Residencia"
      >
        {municipiosData.map((value, index) => (
            <MenuItem value={value.id_lugar} key={index}>{value.nombre_lugar}</MenuItem>
        ))}
      </Select>
    </FormControl>)}
    <TextField
          label="Direccion"
          variant="outlined"
          fullWidth
          margin="normal"
          name="direccion"
          value={values.direccion}
          onChange={handleChange}
    />
    <TextField
          label="Numero de telefono"
          variant="outlined"
          fullWidth
          margin="normal"
          name="numeroTelefono"
          value={values.numeroTelefono}
          onChange={handleChange}
          type="number"
    />
    </Box>)
};

export function getStepContent(step, handleChange, values, errors, options) {

    switch (step) {
        case 0:
          return (<Step1 handleChange={handleChange} values={values} options={options} errors={errors}/>);
        case 1:
          return (<Step2 handleChange={handleChange} values={values} errors={errors}/>);
        case 2:
          return (<Step3 handleChange={handleChange} values={values} options={options}/>);
        default:
          return 'Unknown step';
      }
}