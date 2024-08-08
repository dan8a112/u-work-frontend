import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import ApplicationCard from '../cards/ApplicationCard';

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
  return (
    <CenteredBox>
      <ApplicationCard/>
      <ApplicationCard/>
      <ApplicationCard/>
      <ApplicationCard/>
      <ApplicationCard/>
    </CenteredBox>
  );
}

export default Application;
