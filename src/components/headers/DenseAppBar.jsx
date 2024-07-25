import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function DenseAppBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              U-Work
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
  );
}

export default DenseAppBar;
