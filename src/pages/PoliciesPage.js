// import React from 'react'

// import { PolicisPageCard } from '../components/Card'
// import { inforMation } from '../models/PolicyPlanInformation'

// import './PagesStyles/PoliciesPage.css'

// const Policies = (props) => {

//     const Info = inforMation;

//     return (
//         <>
//             <br/>
//             <header className="page-header">
//                 <h1>Select Policy</h1>
//             </header>
//             <div className='policies'>
//                 {Info.map((item, index) => (
//                     <PolicisPageCard key={item.id || index} Info={item} /> // Assign a unique key to each child element
//                 ))}
//             </div>
//         </>
//     )
// }

// export default Policies
import React from 'react';

import { PolicisPageCard } from '../components/Card';
import { inforMation } from '../models/PolicyPlanInformation';

import './PagesStyles/PoliciesPage.css';
import Image from './Assets/Policy.jpg';

const Policies = (props) => {
    const Info = inforMation;

    return (
        <>
        <header className='page-header'>
        <h1>Select A policy</h1>
        </header>
        
            <div className='image-container'>
                
                <img src={Image} alt='Staking Image' className='staking-image' />
            </div>
            <div className='policies'>
                {Info.map((item, index) => (
                    <PolicisPageCard key={item.id || index} Info={item} /> // Assign a unique key to each child element
                ))}
            </div>
        </>
    );
};

export default Policies;
