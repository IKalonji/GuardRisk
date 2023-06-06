import React, { Component } from 'react';
import Typography from '@mui/material/Typography';

import { StakeOptionsCard } from '../components/Card';
import { StakeOptions } from '../models/StakerOptionsModel';

import './PagesStyles/StakerOptions.css'

export default class StakerOptions extends Component {
  constructor() {
    super(); // Call super() before accessing 'this'
    this.Staker = StakeOptions;
  }

  render() {
    return (
      <div>
        <Typography variant="h4" component="h3" align="center">
          <br/>
          Choose staking Options
        </Typography>
        <div className='options'>
        <br/><br/><br/><br/><br/><br/>
        {this.Staker.map((staker, index) => (
        <StakeOptionsCard key={index} Staker={staker} />
        ))}

      </div>

      </div>

    );
  }
}
