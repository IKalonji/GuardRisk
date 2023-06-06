import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


import "./ComponentStyles/Claims.css"

const Claims = () => {
  return (
    <div className="page">

      <div className="centered-paper">
        <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
          <Typography variant="h3" component="h2">
            Outstanding claims ________
          </Typography>
        </Paper>
        <br />
        <Paper elevation={3} sx={{ padding: '1rem', width:"660px"}}>
          <Typography variant="h4" component="h2">
            Line 1
          </Typography>
          <Typography variant="h4" component="h2">
            Line 2
          </Typography>
          <Typography variant="h4" component="h2">
            Line 3
          </Typography>
          <Typography variant="h4" component="h2">
            Line 4
          </Typography>
        </Paper>
      </div>

    </div>
  );
};

export default Claims;
