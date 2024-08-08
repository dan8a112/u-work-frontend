import * as React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomCard = styled(Card)(({ theme }) => ({
  height: '166px',
  width: '824px',
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(2),
  marginBottom: '20px',
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flexBasis: '25%',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  flexBasis: '50%',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StatusSection = styled(Box)(({ theme }) => ({
  flexBasis: '25%',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

function ApplicationCard() {
  return (
    <CustomCard>
      <ImageSection>
        <img src="/img/bac_credomatic.png" alt="Placeholder" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      </ImageSection>
      <InfoSection>
        <Typography variant="h6">Título de la Oferta</Typography>
        <Typography variant="subtitle1">Nombre de la Empresa</Typography>
        <Typography variant="body1">Fecha: 01/01/2024</Typography>
        <DateText variant="body2">Fecha de publicación: 31/12/2023</DateText>
      </InfoSection>
      <StatusSection>
        <Typography variant="body2" style={{ color: '#DBD200' }}>En proceso</Typography>
        <Button variant="contained" color="primary" size="small">Ver Oferta</Button>
      </StatusSection>
    </CustomCard>
  );
}

export default ApplicationCard;
