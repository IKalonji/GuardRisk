import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Image from './Assets/StakingImage.jpg';
import './PagesStyles/StakingPage.css';

const StakingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="StakingPage">

      <div className="image-container">
        <img src={Image} alt="" />
      </div>
      
      <div className="content-container">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" align="center">
            Become a Staker
          </Typography>
          <Typography variant="body1" align="center">
            Start earning rewards by staking GuardRisk Insurance
          </Typography>
        </Box>

        <Box sx={{ width: 400 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" align="center">
                Staking Rewards
              </Typography>
              <Typography variant="body2" align="center">
                Earn generous rewards for staking your tokens with us.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/stake-options')}>
                  Get Started
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default StakingPage;
