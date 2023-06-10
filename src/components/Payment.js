import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LeftSideButton, RightSideButton } from '../models/CustomButtonStyles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AppStateService } from '../state-singletons/app-state.service';

import './ComponentStyles/Payment.css'

const Payment = () => {
  let service = new AppStateService();
  let renewalDate = `${new Date(service.policyDetails.expire * 1000)}`;
  return (
    <div className="payment">
      <br /><br />
      <div>
        <Paper elevation={3} sx={{ padding: '1rem', width: "460px" }} >
          <Typography variant="h2" component="h2" color={"green"}>Payment Details</Typography>
        </Paper>
        <br />
        <Paper elevation={3} sx={{ padding: '1rem', width: "460px" }}>
          <Typography variant="h6" component="h3" color="error">Payment Due: {renewalDate}</Typography>
        </Paper>

        <Stack spacing={2} direction="row">
          <Button size="large" sx={LeftSideButton} fullWidth variant={"contained"} >Make payment</Button>
        </Stack>
      </div>
    </div>
  );
};

export default Payment;
