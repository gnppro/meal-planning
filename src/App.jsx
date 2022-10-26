import React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  pallete: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" />
    </ThemeProvider>
  );
}

export default App;
