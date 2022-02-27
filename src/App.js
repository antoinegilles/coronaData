import './App.css';
import CoronaData from './coronaData';
import CoronaDataRegion from './coronadataRegion';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FlagIcon from '@mui/icons-material/Flag';
import RoomIcon from '@mui/icons-material/Room';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// Routeur
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

export default function App() {
  const [state, setState] = useState({
    left: false,
  });
  const [dataDepartements, setDepartements] = useState([]);
  const [listeDepartement, setListeDepartement] = useState(['']);



  useEffect(() => {
    axios.get('https://coronavirusapifr.herokuapp.com/data/live/departements').then((response) => {
      setDepartements(response.data)

      const data = []
      let id = 0
      response.data.forEach(element => {
        id += 1
        data.push({ 'id': id, 'departement': element.lib_dep })
      });
      setListeDepartement(data)

    })



  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to="/" button key={'france'}>
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary={'France'} />
        </ListItem>

        <ListItem button component={Link} to="/region" key={'region'}>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText primary={'Par région'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='appBar'>
      <AppBar position="static" className='navBar'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0 }}>
            CoronaData
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>

        {/* Menu . */}
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>

        <Routes>
          <Route exact path="/coronadata" element={<CoronaData />} />
          <Route exact path="/coronadata/region" element={<CoronaDataRegion listeDepartement={listeDepartement} data={dataDepartements} />} />
        </Routes>
      </Router>
    </div>
  );
}
