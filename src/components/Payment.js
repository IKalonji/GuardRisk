import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LeftSideButton, RightSideButton } from '../models/CustomButtonStyles';
import Buttons from './Button';

import './ComponentStyles/Payment.css'

const Payment = () => {

  return (
    <div className="payment">
      <br /><br />
      <div>
        <Paper elevation={3} sx={{ padding: '1rem', width: "460px" }} >
          <Typography variant="h2" component="h2" color={"green"}>
            Last Payments
            
          </Typography>
        </Paper>
        <br />
        <Paper elevation={3} sx={{ padding: '1rem', width: "460px" }}>
          <Typography variant="h6" component="h3" color="error">
            Current payments made: 0
          </Typography>
        </Paper>
        <Buttons buttonContent={"Make payment"} variant={"contained"} Style={LeftSideButton}  /> {/* Pass the connectToMetaMask function as a prop */}
        <Buttons buttonContent={"Second option"} variant={"contained"} Style={RightSideButton} />
      </div>
    </div>
  );
};

export default Payment;
