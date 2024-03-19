import { useState } from 'react'
import './App.css'
import CarList from './Components/CarList'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppBar position='static' >
        <Toolbar>
          <Typography variant="h6" >
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </>
  )
}

export default App
