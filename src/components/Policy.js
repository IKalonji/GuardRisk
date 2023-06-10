import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { AppStateService } from '../state-singletons/app-state.service';

import './ComponentStyles/Policy.css';

const Policy = () => {
  const navigate = useNavigate();
  let service = new AppStateService();

  const handleUpdatePolicy = () => {
    // Logic for updating policy
    navigate("/policies");
  };

  const handleCancelPolicy = () => {
    service.policyCancel();
    console.log("Policy canceling.... ");
  }
  return (
    <div className='policy'>
        <Box sx={{ width: 380 }}>
        <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor:"#B3C890"}} elevation={12}>
          <CardContent>
            <Typography variant="h6" component="h2" align="center">
              Upgrade Policy
            </Typography>
            <Divider sx={{ backgroundColor: "white", height: 5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center", mt: 2 }}>
              <Stack spacing={2} direction="row">
                <Button  size="large" sx={{ top:150}} fullWidth variant={"contained"} onClick={handleUpdatePolicy} >upgrade</Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* CancelPolicyCard */}
      <Box sx={{ width: 380 }}>
        <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor:"#FF6961"}} elevation={16}>
          <CardContent>
            <Typography variant="h6" component="h2" align="center">
              Cancel Policy
            </Typography>

            <Divider sx={{ backgroundColor: "white", height: 5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center",  mt: 2 }}>
              <Stack spacing={2} direction="row">
                  <Button  size="large" sx={{ top:150}} fullWidth variant={"contained"} onClick={handleCancelPolicy} >cancel</Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>

    </div>
  );
};

export default Policy;
