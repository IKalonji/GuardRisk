import React from 'react';
import Section from '../components/Section';
import Connect from '../components/Connect';

import './PagesStyles/Home.css'

const Home = (props) => {

  return (
    <div className="home">
        <br/><br/>
      <Section 
      extraComponetn0={<Connect content={"Connect to MetaMask"} Variant={"contained"} singleton={props.singleton}/>}/>
    </div>
  );
};

export default Home;
