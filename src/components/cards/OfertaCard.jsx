import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ fechaPublicacion, puesto, empresa, descripcion, imageCompany, onNavigate }) => (
  <React.Fragment>
    <CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageCompany}
        sx={{ objectFit: 'contain', height: '40px', width: '180%' }} 
      />
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {fechaPublicacion}
      </Typography>
      <Typography variant="h5" component="div">
        {puesto}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {empresa}
      </Typography>
      <Typography variant="body2">
        {descripcion}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onNavigate}>Ver más</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard({ fechaPublicacion, puesto, empresa, descripcion, imageCompany }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/offersDetail");
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ marginBottom: "15px" }}>
        <CustomCard
          fechaPublicacion={fechaPublicacion}
          puesto={puesto}
          empresa={empresa}
          descripcion={descripcion}
          onNavigate={handleNavigate} 
          imageCompany = {imageCompany}
        />
      </Card>
    </Box>
  );
}
