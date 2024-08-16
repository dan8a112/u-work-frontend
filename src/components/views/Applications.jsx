import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import ApplicationCard from '../cards/ApplicationCard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

export function Application() {

  const navigate = useNavigate();
  const { idApplicant } = useParams();
  const [applications, setApplications] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/solicitante/solicitudes/${idApplicant}`);
        setApplications(response.data || []);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [idApplicant]);

  const handleOnClick = (url) => {
    navigate(url);
  }
  return (
    <CenteredBox>
      {applications.map((application) => (
        <ApplicationCard 
        key={application.idOferta}
        title={application.tituloOferta} 
        nameCompany={application.nombreEmpresa} 
        Date={application.fechaPublicacionOferta} 
        DatePostOfert={application.fechaSolicitud} 
        state={application.estadoSolicitud} 
        imageCompany={application.url_logo}
        onClick={() => handleOnClick(application.url)}></ApplicationCard>
      ))}
    </CenteredBox>
  );
}

export default Application;
