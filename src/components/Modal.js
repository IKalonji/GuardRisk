import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Connect from './Connect';
import { ModalRightButton, ModalLefButton } from '../models/CustomButtonStyles';
import ModaIltemsList from './ModaIltemsList';

import MainButton from './Button';

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

function PolicyModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' sx={{ top:100}}> Policy details </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={BoxStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {props.Info.planName}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.Info.fullDescription}
          </Typography>

          <ModaIltemsList />

          {/* <Connect Variant={"contained"} content={"Policy details"} SX={ModalRightButton}/> */}
          <Connect content={"Management Page"} Variant={"contained"} singleton={props.singleton} SX={ModalRightButton}/>
          <MainButton clicked={handleClose} buttonContent={"Close"} variant={"contained"} Style={ModalLefButton}/>
        
        </Box>
      </Modal>
    </div>
  );
}

export default PolicyModal