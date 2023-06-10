import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './PagesStyles/Home.css'
import { AppStateService } from '../state-singletons/app-state.service';

const Home = (props) => {

  const navigate = useNavigate();
  const connectToMetamask = async () => {
    let service = new AppStateService();
    let result = await service.connectToMetaMask();
    if (result) {
      service.getPolicy().then(() => {
        if (service.policyDetails !== undefined){
          navigate("/management");
          }
          else {
            alert("You do not have a policy, please sign up for one");
          }
        }
      )
    }
  }
  return (
    <div className="home">
      <br/>
      <br/>
      <div>
        <br/>
        <section className="section">
          <div className="content">
            <div className="headers">
              <h2>
                Insuring
                <br/>
                Volatility in your
                <br/>
                Crypto Assets
              </h2>
              <br/>
              <br/>
              <br/>
              <Stack spacing={2} direction="row">
                <Button className={props.ClassName} size="large" sx={props.Style} fullWidth variant={"contained"} onClick={connectToMetamask} >Connect to MetaMask</Button>
              </Stack>
            </div>
          <div className="img-container">
            <img src="https://appinventiv.com/wp-content/uploads/sites/1/2022/07/What-is-DeFi-Insurance-Identifying-Business-Opportunities-and-Use-Cases_-01-scaled.webp" alt="" className="image"/>
          </div>
        </div>
      </section>
  </div>
</div>
    );
  }

export default Home;
