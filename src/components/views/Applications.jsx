import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import ApplicationCard from '../cards/ApplicationCard';
import { useNavigate } from 'react-router-dom';

const CenteredBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#F1FAF9',
  width: '70%',
  minHeight: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '0 auto',
  marginTop: '80px',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: '20px',
  flexDirection: 'column',
  
}));

const applications = [
  {
    key: "1",
    title: "Título de la Oferta", 
    nameCompany: "Nombre de la Empresa", 
    Date: "Fecha: 01/01/2024", 
    DatePostOfert: "31/12/2023", 
    state: "En proceso",
    url: "/offersDetail"
  },
  {
    key: "2",
    title: "Título de la Oferta", 
    nameCompany: "Nombre de la Empresa", 
    Date: "Fecha: 01/01/2024", 
    DatePostOfert: "31/12/2023", 
    state: "En proceso",
    url: "/offersDetail"
  },
  {
    key: "3",
    title: "Título de la Oferta", 
    nameCompany: "Nombre de la Empresa", 
    Date: "Fecha: 01/01/2024", 
    DatePostOfert: "31/12/2023", 
    state: "En proceso",
    url: "/offersDetail"
  },
]

export function Application() {

  const navigate = useNavigate();

  const handleOnClick = (url) => {
    navigate(url);
  }
  return (
    <CenteredBox>
      {applications.map((application) => (
        <ApplicationCard 
        title={application.title} 
        nameCompany={application.nameCompany} 
        Date={application.Date} 
        DatePostOfert={application.DatePostOfert} 
        state={application.state} 
        onClick={() => handleOnClick(application.url)}></ApplicationCard>
      ))}
    </CenteredBox>
  );
}

export default Application;
