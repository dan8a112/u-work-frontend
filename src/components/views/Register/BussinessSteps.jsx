import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText} from "@mui/material";


const Step1 = ({ handleChange, values, options, errors }) => (
  <Box>
    <TextField
      label="Nombre de Empresa"
      variant="outlined"
      fullWidth
      margin="normal"
      name="correo"
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
            {options.industria.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
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
            {options.pais.map((value, index) => (
              <MenuItem value={value.id} key={index}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.pais}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
    <TextField
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

const Step3 = ({ handleChange, values, options, errors }) => (
  <Box>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Primer Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="director.primerNombre"
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
          name="director.segundoNombre"
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
          name="director.primerApellido"
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
          name="director.segundoApellido"
          value={values.segundoApellido}
          onChange={handleChange}
          error={!!errors.segundoApellido}
          helperText={errors.segundoApellido}
        />
      </Grid>
    </Grid>
    <TextField
      label="Identificacion"
      variant="outlined"
      fullWidth
      margin="normal"
      name="director.identificacion"
      value={values.identificacion}
      onChange={handleChange}
      error={!!errors.identificacion}
      helperText={errors.identificacion}
    />
    <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.genero}>
      <InputLabel>Genero</InputLabel>
      <Select
        name="director.genero"
        value={values.genero}
        onChange={handleChange}
        label="Genero"
      >
        {options.genero.map((value, index) => (
          <MenuItem value={value.id} key={index}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.genero}</FormHelperText>
    </FormControl>
  </Box>
);

//Datos estaticos (de manera temporal del options)
const options = {
    pais: [
        {
            id: "1",
            label: "Honduras"
        },
        {
            id: "2",
            label: "Nicaragua"
        }
    ],
    genero: [
        {
            id: "1",
            label: "Masculino"
        },
        {
            id: "2",
            label: "Femenino"
        }
    ],
    industria: [
        {
            id: "1",
            label: "Desarrollo Web"
        },
        {
            id: "2",
            label: "Alimentos"
        }
    ]
}

export function getStepContent(step, handleChange, values, errors) {

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