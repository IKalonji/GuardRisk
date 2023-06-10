import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppStateService } from '../state-singletons/app-state.service';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


// import Connect from './Connect';
import Ai from './Images/ai.jpg';

const Navbar = (props) => {
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
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Ai} alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <Typography variant="h6" noWrap>
              GuardRisk
            </Typography>
          </div>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Button component={Link} to="/" color="info">Home</Button>
        <Button component={Link} to="/policies" color="info">Policies</Button>
        <Button component={Link} to="/become-a-staker" color="info">Stake</Button>
        <Stack spacing={2} direction="row">
          <Button className={"nav-link1"} variant={"text"} onClick={connectToMetamask} >Management Page</Button>
        </Stack>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
