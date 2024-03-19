import { useState } from 'react'
import './App.css'
import CarList from './Components/CarList'

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <AppBar position='static' >
        <Toolbar>
          <Typography variant="h6" >
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <CarList />
    </>
  )
}

export default App
