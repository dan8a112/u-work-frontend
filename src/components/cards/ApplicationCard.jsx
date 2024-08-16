import * as React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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

function ApplicationCard({idOferta, title, nameCompany, Date, DatePostOfert, state, imageCompany}) {
  const navigate = useNavigate();
  const handleNavgate = (offerId) => {
    navigate(`/offersDetail/${offerId}`);
  }
  return (
    <CustomCard>
      <ImageSection>
        <img src={imageCompany} alt="Placeholder" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      </ImageSection>
      <InfoSection>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{nameCompany}</Typography>
        <Typography variant="body1">{Date}</Typography>
        <DateText variant="body2">Fecha de publicación: {DatePostOfert}</DateText>
      </InfoSection>
      <StatusSection>
        <Typography variant="body2" style={{ color: '#DBD200' }}>{state}</Typography>
        <Button variant="contained" color="primary" size="small" onClick={() => handleNavgate(idOferta)}>Ver Oferta</Button>
      </StatusSection>
    </CustomCard>
  );
}

export default ApplicationCard;
