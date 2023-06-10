import React, { Component, useState } from 'react';
import Typography from '@mui/material/Typography';

import { StakeOptions } from '../models/StakerOptionsModel';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import './PagesStyles/StakerOptions.css'
import { AppStateService } from '../state-singletons/app-state.service';
import Image from './Assets/Stakingoffice.jpg'

export default class StakerOptions extends Component {
  constructor() {
    super(); // Call super() before accessing 'this'
    this.Staker = StakeOptions;
    this.amount = undefined;
  }

  // valueUpdate = (index) =>  {
  //   this.amount = document.getElementById(index.toString()).value;
  //   console.log(this.amount)
  // }

  doStaking = (period, index) => {
    this.amount = document.getElementById(index.toString()).value;
    console.log(this.amount)
    const service = new AppStateService();
    service.stakeAmount(this.amount, period);
  }

  render() {
    return (
      <div className="StakingPage" style={{justifyContent:"center"}}>

        <Typography variant="h4" component="h3" align="center">Select a staking Options</Typography>
        <div className="image-container">
          <img src={Image} alt="" />
        </div>

        <div className='content-container'>

            <div className='options'>
            <br/><br/><br/><br/><br/><br/>
            {this.Staker.map((staker, index) => (
            <Box sx={{ width: 380}} key={index}>
            <Card sx={{ width: 300, height: 300, zIndex: -1}}>
              <CardContent>
                <Typography variant="h5" component="h4" align="center">
                  {staker.STakeOption}
                </Typography>
                <Typography variant="body2" component="h5" align="center">
                  {staker.PlanDescription}
                </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:"center", mt: 2 }}>
              <TextField
              id={`${index}`}
              label="Amount"
              type='number'/>
              {/* onChange={() => {this.valueUpdate(`${index}`)}} */}
                <Stack spacing={2} direction="row">
                  <Button size="large" fullWidth variant={"contained"} onClick={() => {this.doStaking(staker.period,index)}} sx={{ top:100}}>{staker.ButtonText}</Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
          ))}
        </div>
        </div>

        </div>

      );
    }
  }
