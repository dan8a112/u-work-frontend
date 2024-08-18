import * as React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Typography, Box } from '@mui/material';

const CustomCard = styled(Card)(({ theme }) => ({
  minHeight: '62px',
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(1),
  boxShadow: 'none',
  backgroundColor: '#fff',
  cursor: 'pointer',
  position: 'relative',
  borderBottom: '1px solid #f1f1f1',
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: theme.spacing(2),
  flex: 1,
  width: '20%',
  marginTop: '10px'
}));

const NotificationTitle = styled(Typography)(({ theme, fontWeight }) => ({
  fontWeight: fontWeight || '500',
  fontSize: '12px',
  width: '70%',
}));

const NotificationSubheader = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
}));

const NotificationDate = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  fontSize: '9px',
  color: theme.palette.text.disabled,
}));
 
export default function NotificationCard({ onClick, title, date, state }) {

  const fontWeight = state === 0 ? '700' : '400';

  return (
    <CustomCard onClick={onClick}>
      <Avatar aria-label="recipe" src="/img/alert-circle.svg" />
      <TitleContainer>
        <NotificationTitle fontWeight={fontWeight}>{title}</NotificationTitle>
        <NotificationSubheader>{date}</NotificationSubheader>
      </TitleContainer>
      <NotificationDate>{date}</NotificationDate>
    </CustomCard>
  );
}
