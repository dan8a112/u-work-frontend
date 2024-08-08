import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

export default function NotificationCard({ onClick }) {
  return (
    <Card 
      sx={{ maxWidth: 250, backgroundColor: '#F1FAF9', marginBottom: 2, cursor: 'pointer', p:'0px' }}
      onClick={onClick}
    >
      
      <CardHeader sx={{ padding: '8px' }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src='/img/bac_credomatic.png'/>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
}
