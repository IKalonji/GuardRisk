import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import MainButton from './Button'

import { AppStateService } from '../state-singletons/app-state.service';

import PolicyModal from './Modal';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export function PolicisPageCard(props) {
  const stateService = new AppStateService();

  return (
    <>
      <br/><br/><br/>
      <Card sx={{ width: 275, height: 300, textAlign:"center" }} elevation={5} data-b={true}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          
          </Typography>
          <Typography variant="h5" component="div">
            {props.Info.priceheader}
            <br/>
            <Divider />
            {props.Info.planName}
          </Typography>
          <Typography variant="body2">
            {props.Info.shertDescription}
          </Typography>
        </CardContent>
        {/* <CardActions>
          
        </CardActions> */}
        <PolicyModal Info={props.Info} singleton={stateService}/>
      </Card>
    </>
  );
}

export function DashboardInformationCard(props) {
  return (
    <>
      <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor: props.Dash.Color, textAlign:"center" }} elevation={12}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.Dash.heading}
          </Typography>
        </CardContent>
        <Divider sx={{ backgroundColor: "white", height: 5 }} />
        <CardActions></CardActions>

        <Paper
          sx={{
            height: '35%',
            marginTop: '6%',
            padding: '10px',
            width: '50%',
            marginLeft: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="outlined"
        >
          <Typography variant="body1" color="springgreen">
            NOT ACTIVE
          </Typography>
        </Paper>
      </Card>
    </>
  );
}


export function UpdatePolicyCard() { 
  
  const navigate = useNavigate();

  const handleUpdatePolicy = () => {
    // Logic for updating policy
    navigate("/policies");
  };
  

  return (
    <Box sx={{ width: 380 }}>
        <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor:"#B3C890"}} elevation={12}>
          <CardContent>
            <Typography variant="h6" component="h2" align="center">
              Upgrade Policy
            </Typography>

            <Divider sx={{ backgroundColor: "white", height: 5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center",justifyContent:"center", mt: 2 }}>
              <MainButton variant={"contained"} clicked={handleUpdatePolicy} buttonContent={"upgrade"} Style={{ top:150}}/>
            </Box>
          </CardContent>
        </Card>
      </Box>
    
  );
}

export function CancelPolicyCard() { 
  
  const navigate = useNavigate();

  const handleUpdatePolicy = () => {
    // Logic for updating policy
    navigate("/policies");
  };

  return (
    <Box sx={{ width: 380 }}>
        <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor:"#FF6961"}} elevation={16}>
          <CardContent>
            <Typography variant="h6" component="h2" align="center">
              Cancel Policy
            </Typography>

            <Divider sx={{ backgroundColor: "white", height: 5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center",justifyContent:"center", mt: 2 }}>
              <MainButton variant={"contained"} clicked={handleUpdatePolicy} buttonContent={"Cancel"} Style={{ top:150}}/>
            </Box>
          </CardContent>
        </Card>
      </Box>
    
  );
}

export function StakeOptionsCard(props){

  const doStaking = () => {
    const service = new AppStateService();
    service.stakeAmount();
  }

   return (
    <Box sx={{ width: 380}}>
        <Card sx={{ width: 300, height: 300, zIndex: -1}}>
          <CardContent>
            <Typography variant="h6" component="h2" align="center">
              {props.Staker.STakeOption}
            </Typography>
            <Typography variant="body2" align="center">
              {props.Staker.PlanDescription}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center",justifyContent:"center", mt: 2 }}>

              <MainButton variant={"contained"} buttonContent={props.Staker.ButtonText} clicked={doStaking} Style={{ top:150}}/>
            </Box>
          </CardContent>
        </Card>
      </Box>
   )
}