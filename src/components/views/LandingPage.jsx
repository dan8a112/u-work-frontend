import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#0D9E82',
  color: '#FFFFFF',
  padding: '60px 0',
  textAlign: 'center',
}));

const Section = styled(Box)(({ theme }) => ({
  padding: '60px 0',
  backgroundColor: '#F1FAF9',
  textAlign: 'center',
}));

const Feature = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  textAlign: 'center',
}));

const Buttont = styled(Button)(({ theme }) => ({
  borderColor: '#FFFFFF', 
  color: '#FFFFFF', 
  width: '30%',
  marginTop: '10px',
  '&:hover': {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
}));

export function LandingPage() {
  const navigate = useNavigate();


  const handleCompanyRegistration = () => {
    navigate('/register/company');
  };

  const handleUserRegistration = () => {
    navigate('/register/user');
  };

  return (
    <Box>
      <HeroSection>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Encuentra el Trabajo de Tus Sueños o el Talento que Necesitas
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nuestra plataforma conecta empresas con los mejores solicitantes.
          </Typography>
          <Buttont variant="outlined" color="secondary" size="large" onClick={() => navigate('/login')}>
            Empieza Ahora
          </Buttont>
          <Buttont variant="outlined" color="secondary" size="large" onClick={() => navigate('/loginCompany')}>
            Eres una empresa?
          </Buttont>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <Typography variant="h4" gutterBottom>
            Características Principales
          </Typography>
          <Box display="flex" justifyContent="center" gap="20px" flexWrap="wrap">
            <Feature>
              <Typography variant="h5" gutterBottom>
                Para Empresas
              </Typography>
              <Typography>
                Publica ofertas de trabajo y encuentra a los candidatos ideales con facilidad.
              </Typography>
            </Feature>
            <Feature>
              <Typography variant="h5" gutterBottom>
                Para Solicitantes
              </Typography>
              <Typography>
                Busca oportunidades laborales y postula a trabajos que se ajusten a tu perfil.
              </Typography>
            </Feature>
            <Feature>
              <Typography variant="h5" gutterBottom>
                Gestión Simplificada
              </Typography>
              <Typography>
                Administra tus ofertas o aplicaciones de manera sencilla desde una única plataforma.
              </Typography>
            </Feature>
          </Box>
        </Container>
      </Section>

      <Box sx={{ backgroundColor: '#0D9E82', color: '#FFFFFF', padding: '40px 0', textAlign: 'center' }}>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant="h4" gutterBottom>
            ¿Listo para empezar?
          </Typography>
          <Buttont variant="outlined" color="secondary" size="large" onClick={handleUserRegistration}>
            Registrate
          </Buttont>
          <Buttont variant="outlined" color="secondary" size="large" onClick={handleCompanyRegistration}>
            Registrate como empresa
          </Buttont>
        </Container>
      </Box>
    </Box>
  );
}
