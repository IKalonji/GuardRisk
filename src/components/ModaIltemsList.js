import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {SiEthereum} from "react-icons/si";

import './ComponentStyles/ModaIltemsList.css'

export default function ModaIltemsList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px", left:"25%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"

    >

      <ListItemButton onClick={handleClick} >
      <ListItemText primary="Choose blockchain" sx={{textAlign:"center"}}/>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse primary="list" in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItemButton sx={{ pl: 4 }} >
                <ListItemIcon>
                    <div className='span'>
                        <img className='logoImage' src='https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg' alt=''/>
                    </div>
                </ListItemIcon>    
                <ListItemText primary="Etherum" />      
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
                    <div className='span'>
                        <img className='logoImage' src='https://s2.coinmarketcap.com/static/img/coins/64x64/2634.png' alt=''/>
                    </div>
                </ListItemIcon> 
                <ListItemText primary="XDC" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <div className='span'>
                        <img className='logoImage' src='https://assets.coingecko.com/coins/images/13708/large/WeChat_Image_20220118095654.png?1642471094' alt=''/>
                    </div>
                </ListItemIcon> 
                <ListItemText primary="OKT" />
            </ListItemButton>

          
        </List>
      </Collapse>
    </List>
  );
}
