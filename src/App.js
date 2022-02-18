import './App.css';
import CoronaData from './coronaData';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  return (
    <div className="App">
      <AppBar position="static" className='navBar'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0 }}>
            CoronaData
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='titleOne'>
        <div>
          <img className='imgLocation' src="./img/location.png" />
        </div>
        <div>
          <h1 className='titre'>France</h1>
        </div>
      </div>
      <CoronaData></CoronaData>
    </div>
  );
}

export default App;
