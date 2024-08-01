import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText} from "@mui/material";


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
        {options.nacionalidad.map((value, index) => (
            <MenuItem value={value.id} key={index}>{value.label}</MenuItem>
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
            {options.genero.map((value, index) => (
            <MenuItem value={value.id} key={index}>{value.label}</MenuItem>
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
            <MenuItem value={value.id} key={index}>{value.label}</MenuItem>
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

const Step3 = ({handleChange, values, options}) => (
    <Box>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Lugar de residencia</InputLabel>
      <Select
        name="lugarResidencia"
        value={values.lugarResidencia}
        onChange={handleChange}
        label="Lugar de Residencia"
      >
        {options.nacionalidad.map((value, index) => (
            <MenuItem value={value.id} key={index}>{value.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
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
    </Box>
);

//Datos estaticos (de manera temporal del options)
const options = {
    nacionalidad: [
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
    estadoCivil: [
        {
            id: "1",
            label: "Soltero"
        },
        {
            id: "2",
            label: "Casado"
        }
    ]
}

export function getStepContent(step, handleChange, values, errors) {

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