import React from 'react';
import { Box, Typography, Card } from '@mui/material';

const CompanyProfileCard = ({ company }) => {
    return (
      <Card
        sx={{
          maxWidth: "100%",
          bgcolor: "#F1FAF9",
          padding: 3,
          my: 5,
          position: "relative",
          boxShadow: "none",
          display: 'flex',
          marginBottom: 0
        }}
      >
        {/* Contenedor de la Imagen */}
        <Box 
          sx={{ 
            width: 250, 
            height: 250, 
            backgroundColor: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: 3
          }}
        >
          <img 
            src={company.imageUrl} 
            alt={company.name} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </Box>
  
        {/* Contenedor de la Información */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Nombre de la Empresa */}
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            {company.name}
          </Typography>
          
          {/* Industria y Ofertas Publicadas */}
          <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
            {company.industry} • {company.offersCount} ofertas publicadas
          </Typography>
          
          {/* País */}
          <Typography variant="h6" sx={{ color: 'text.primary', marginTop: 2 }}>
            {company.country}
          </Typography>
        </Box>
      </Card>
    );
  }


export default CompanyProfileCard;
