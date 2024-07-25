import { Box, TextField, Grid, Select, MenuItem, InputLabel, FormControl} from "@mui/material";


const Step1 = ({handleChange, values, options}) => (
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
        />
      </Grid>
    </Grid>
    <FormControl fullWidth sx={{ mt: 2 }}>
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
    </FormControl>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }}>
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
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{ mt: 2 }}>
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
        </FormControl>
      </Grid>
    </Grid>
  </Box>
);

const Step2 = ({handleChange, values}) => (
    <Box>
    <TextField
          label="Correo Electronico"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={values.correo}
          onChange={handleChange}
    />
    <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={values.contrasena}
          onChange={handleChange}
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
          label="Numero de telefono"
          variant="outlined"
          fullWidth
          margin="normal"
          name="numeroTelefono"
          value={values.numeroTelefono}
          onChange={handleChange}
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

export function getStepContent(step, handleChange, values) {

    switch (step) {
        case 0:
          return (<Step1 handleChange={handleChange} values={values} options={options}/>);
        case 1:
          return (<Step2 handleChange={handleChange} values={values}/>);
        case 2:
          return (<Step3 handleChange={handleChange} values={values} options={options}/>);
        default:
          return 'Unknown step';
      }
}