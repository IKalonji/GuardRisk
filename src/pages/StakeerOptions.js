import React, { Component } from 'react';

import { StakeOptionsCard } from '../components/Card';
import { StakeOptions } from '../models/StakerOptionsModel';

import './PagesStyles/StakerOptions.css'

export default class StakeerOptions extends Component {
  constructor() {
    super(); // Call super() before accessing 'this'
    this.Staker = StakeOptions;
  }

  render() {
    return (
      <div className='options'>
        
        {this.Staker.map((staker, index) => (
        <StakeOptionsCard key={index} Staker={staker} />
        ))}

      </div>
    );
  }
}
