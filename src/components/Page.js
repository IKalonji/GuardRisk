import React from 'react';

import './Page.css';

const Page = (props) => {
  console.log(props.Clicked); // Check the value of Clicked prop
  return (
    <div className='page'>  
      <h1>whats popping</h1>
    </div>
  );
};

export default Page;
