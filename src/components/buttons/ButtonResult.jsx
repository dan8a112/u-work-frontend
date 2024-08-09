import * as React from 'react';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ButtonDictum({ text, backgroundColor, icon}) {
  return (
    <Button
      size='small'
      sx={{
        backgroundColor: backgroundColor,
        marginRight: '10px',
        '&:hover': {
          backgroundColor: '#a6a6a6111',
        },
      }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={icon}
    >
      {text}
    </Button>
  );
}
