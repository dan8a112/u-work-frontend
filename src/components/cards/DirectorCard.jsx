import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const DirectorCard = ({nombre, telefono}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Foto de Perfil Genérica */}
      <Avatar 
        alt="Angel Castillo" 
        sx={{ width: 100, height: 100 }} 
        src="/img/user.png"
      />
      
      {/* Información del Usuario */}
      <Box>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>
          {nombre}
        </Typography>
        <Typography sx={{ fontSize: 20, color: 'text.secondary' }}>
          {telefono}
        </Typography>
      </Box>
    </Box>
  );
}

export default DirectorCard;
