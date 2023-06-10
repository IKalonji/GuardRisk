import React from 'react';
import { inforMation } from '../models/PolicyPlanInformation';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './PagesStyles/PoliciesPage.css';
import { ModalLefButton, ModalRightButton } from '../models/CustomButtonStyles';
import Image from './Assets/Policy.jpg';
import { AppStateService } from '../state-singletons/app-state.service';

const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px 12px solid #000',
    borderRadius: 4,
    boxShadow: `rgba(0, 0, 0, 0.56) 0px 22px 70px 4px`,
    p: 4,
  };

function PolicyModal(props){
    //from modalitemslist
    const [open, setOpen] = React.useState(true);
    const [chain, setChain] = React.useState('');
    const handleClick = () => {
      setOpen(!open);
    };
    //from modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false)

    // const [open, setOpen] = React.useState(false); TODO

    //select policy
    const selectPolicy = () => {
        let service = new AppStateService();
        service.policySelect();
    }

    

    const handleChange = (event) => {
      setChain(event.target.value);
    };
    return(
        <>
            <Button onClick={handleOpenModal} variant='contained' sx={{ top:100}}> Policy details </Button>

            <Modal 
                open={openModal}
                onClose={handleCloseModal}
                style={{textAlign:"center"}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={BoxStyle}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    {props.Item.planName}
                </Typography>
                <br/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.Item.fullDescription}
                </Typography>
                <br/><br/><br/>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a Blockchain</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chain}
                    label="Select a Blockchain"
                    onChange={handleChange}>
                    <MenuItem value={10}>
                        <ListItemIcon>
                            <div className='span'>
                                <img className='logoImage' src='https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png' alt=''/>
                            </div>
                        </ListItemIcon>    
                        Polygon
                    </MenuItem>

                    <MenuItem value={20}>
                        <ListItemIcon>
                            <div className='span'>
                                <img className='logoImage' src='https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png' alt=''/>
                            </div>
                        </ListItemIcon> 
                        Flow
                    </MenuItem>

                    </Select>
                </FormControl>
                
                <br/>
                <Stack spacing={2} direction="row">
                    <Button  sx={ModalRightButton} size='large' variant={"contained"} onClick={selectPolicy} >Confirm</Button>
                </Stack>
                <Stack spacing={2} direction="row">
                    <Button  sx={ModalLefButton} size='large' variant={"contained"} onClick={handleCloseModal} >Close</Button>
                </Stack>
                </Box>
            </Modal>

        </>
    )
}



const Policies = (props) => {
    const Info = inforMation;

    return (
        <>
        <header className='page-header'>
        <h1>Select A policy</h1>
        </header>
        <div className='image-container'>
            <img src={Image} alt='' className='staking-image' />
        </div>
        <div className='policies'>
            {Info.map((item, index) => (
                <>
                <br/><br/><br/>
                <Card sx={{ width: 275, height: 300, textAlign:"center" }} elevation={5} data-b={true} key={item.id || index}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom></Typography>
                    <Typography variant="h5" component="div">
                      {item.priceheader}
                      <br/>
                      <Divider />
                      {item.planName}
                    </Typography>
                    <Typography variant="body2">
                      {item.shertDescription}
                    </Typography>
                    </CardContent>
                    <PolicyModal Item={item}/>
                </Card>
              </>
            ))}
        </div>
        </>
    );
};

export default Policies;
