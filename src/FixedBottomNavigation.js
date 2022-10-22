import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PetsIcon from '@mui/icons-material/Pets';

import Paper from '@mui/material/Paper';

export default function FixedBottomNavigation(props) {
  console.log("props:" + JSON.stringify(props))

  if( props.type == 'book') {
    return (
      <Box sx={{ pb: 7 }}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label="note" icon={<PetsIcon />} onClick={props.handleOpenNote} /> 
            <BottomNavigationAction label="change" icon={<ChangeCircleIcon />} onClick={props.handleChange} />
            <BottomNavigationAction label="Amazon" href={props.bookMark.amazonUrl} target="_blank" rel="noopener" icon={<OpenInNewIcon />} />          
  
          </BottomNavigation>
        </Paper>
      </Box>
    );  
  } else if ( props.type == 'about') {
    return (
      <Box sx={{ pb: 7 }}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label="Change" icon={<ChangeCircleIcon />} href="/"/> 
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
}
