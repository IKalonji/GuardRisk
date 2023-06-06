import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdatePolicyCard, CancelPolicyCard } from './Card';
import { PolicyInfo } from '../models/PolicyComponetInfo';
import MainButton from './Button';

import './ComponentStyles/Policy.css';

const Policy = () => {
  const policy = PolicyInfo;
  return (
    <div className='policy'>
      <UpdatePolicyCard />
      <CancelPolicyCard />
    </div>
  );
};

export default Policy;
