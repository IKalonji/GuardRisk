import React from 'react'

// import { AppStateService } from '../state-singletons/app-state.service'
import {DashboardCardInfo} from '../models/DashboardCardInfo'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import './ComponentStyles/Dashboard.css'
import { AppStateService } from '../state-singletons/app-state.service';

const DashBoard = (props) => {
  let service = new AppStateService();
  if (service.policyDetails === undefined){
    alert("Please navigate Home to refresh the app")
    return;
  }
  const DashboarInfo = DashboardCardInfo(service.policyDetails);
  return (
    <div className='page'>  
      {DashboarInfo.map((item, index) => (
        <>
      <Card sx={{ width: 275, height: 300, zIndex: -1, backgroundColor: item.Color, textAlign:"center" }} elevation={12} key={item.id || index}>
        <CardContent>
          <Typography variant="h5" component="div">
            {item.heading}
          </Typography>
        </CardContent>
        <Divider sx={{ backgroundColor: "white", height: 5 }} />
        <CardActions></CardActions>

        <Paper
          sx={{
            height: '37%',
            marginTop: '6%',
            padding: '10px',
            width: '58%',
            marginLeft: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="outlined"
        >
          <Typography variant="body1" color="black" fontWeight={"12px"}>
            {item.data}
          </Typography>
        </Paper>
      </Card>
    </>
        ))}
    </div>
  )
}
export default DashBoard