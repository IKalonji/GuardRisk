import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


import "./ComponentStyles/Claims.css"

const Claims = () => {
  return (
    <div className="page" >

      <div className="centered-paper">
        <Paper elevation={3} sx={{position:"relative", padding: '1rem', textAlign: 'center',left:"25%", }} >
          <Typography variant="h3" component="h2">
            Outstanding claims
          </Typography>
        </Paper>
        <br />
        <Paper elevation={3} sx={{position:"relative", padding: '1rem', width:"660px", left:"25%", textAlign: 'center'}}>
          <Typography variant="h4" component="h2">
            No Pending/Historical Claims
          </Typography>
        </Paper>
      </div>

    </div>
  );
};

export default Claims;
