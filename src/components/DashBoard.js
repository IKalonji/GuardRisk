import React from 'react'

import { AppStateService } from '../state-singletons/app-state.service'
import {DashboardCardInfo} from '../models/DashboardCardInfo'
import { DashboardInformationCard } from './Card'

import './ComponentStyles/Dashboard.css'

const DashBoard = (props) => {

  const DashboarInfo = DashboardCardInfo;
  return (
    <div className='page'>  
      {DashboarInfo.map((item, index) => (
        <DashboardInformationCard key={index} Dash={item} />
        ))}
    </div>
  )
}
export default DashBoard