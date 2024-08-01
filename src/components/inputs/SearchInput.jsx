import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchInput() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 200, marginTop: 3 }}
      renderInput={(params) => <TextField {...params} label="Categorias" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'Desarrollo de software', year: 1994 },
  { label: 'Ventas', year: 1972 },
  { label: 'Call center', year: 1974 },
  { label: 'Docencia', year: 2008 },
  { label: 'Construccion', year: 1957 },
  { label: "Mantenimiento", year: 1993 },
  { label: 'Atencion al cliente', year: 1994 },
];
