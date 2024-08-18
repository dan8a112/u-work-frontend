import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import { useState } from "react";


const Step1 = ({ handleChange, values, options, errors }) => (
  <Box>
    <TextField
      label="Nombre de Empresa"
      variant="outlined"
      fullWidth
      margin="normal"
      name="nombre"
      value={values.nombre}
      onChange={handleChange}
      error={!!errors.nombre}
      helperText={errors.nombre}
    />
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.industria}>
          <InputLabel>Industria</InputLabel>
          <Select
            name="industria"
            value={values.industria}
            onChange={handleChange}
            label="Industria"
          >
            {options.industrias.map((value, index) => (
              <MenuItem value={value.idIndustria} key={index}>
                {value.industria}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.industria}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.pais}>
          <InputLabel>Pais</InputLabel>
          <Select
            name="pais"
            value={values.pais}
            onChange={handleChange}
            label="Pais"
          >
            {options.lugares.map((value, index) => (
              <MenuItem value={value.id_lugar} key={index}>
                {value.nombre_lugar}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.pais}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
    <TextField
      type="number"
      label="Numero de telefono"
      variant="outlined"
      fullWidth
      margin="normal"
      name="numeroTelefono"
      value={values.numeroTelefono}
      onChange={handleChange}
      error={!!errors.numeroTelefono}
      helperText={errors.numeroTelefono}
    />
    <TextField
      label="Sitio Web"
      variant="outlined"
      fullWidth
      margin="normal"
      name="sitioWeb"
      value={values.sitioWeb}
      onChange={handleChange}
      error={!!errors.sitioWeb}
      helperText={errors.sitioWeb}
    />
  </Box>
);

const Step2 = ({handleChange, values, errors}) => { 

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return(
    <Box>
    <TextField
          sx={{mb:3}}
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
    <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            label="contraseña"
            name="contrasena"
            value={values.contrasena}
            onChange={handleChange}
            error={!!errors.contrasena}
            helperText={errors.contrasena}
          />
    </FormControl>
  </Box>)
  }

const Step3 = ({ handleChange, values, options, errors }) => (
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
    <TextField
      label="Identificacion del director"
      variant="outlined"
      fullWidth
      margin="normal"
      name="identificacion"
      value={values.identificacion}
      onChange={handleChange}
      error={!!errors.identificacion}
      helperText={errors.identificacion}
    />
    <TextField
      type="number"
      label="Telefono del director"
      variant="outlined"
      fullWidth
      margin="normal"
      name="telefonoContacto"
      value={values.telefonoContacto}
      onChange={handleChange}
      error={!!errors.telefonoContacto}
      helperText={errors.telefonoContacto}
    />
    <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.genero}>
      <InputLabel>Genero</InputLabel>
      <Select
        name="genero"
        value={values.genero}
        onChange={handleChange}
        label="Genero"
      >
        {options.generos.map((value, index) => (
          <MenuItem value={value.id_genero} key={index}>
            {value.genero}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.genero}</FormHelperText>
    </FormControl>
  </Box>
);

export function getStepContent(step, handleChange, values, errors, options) {

    switch (step) {
        case 0:
          return (
            <Step1
              handleChange={handleChange}
              values={values}
              options={options}
              errors={errors}
            />
          );
        case 1:
          return (
            <Step2
              handleChange={handleChange}
              values={values}
              errors={errors}
            />
          );
        case 2:
          return (
            <Step3
              handleChange={handleChange}
              values={values}
              options={options}
              errors={errors}
            />
          );
        default:
          return 'Unknown step';
      }
}