import React from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';

const categories = [
  { label: 'Ventas', id: 1 },
  { label: 'Marketing', id: 2 },
  { label: 'Tecnología', id: 3 },
  { label: 'Recursos Humanos', id: 4 },
  { label: 'Finanzas', id: 5 }
];

const SearchAndSuggest = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <TextField label="Buscar" variant="outlined" fullWidth />
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Categorías" variant="outlined" />}
      />
    </Box>
  );
};

export default SearchAndSuggest;
