import { useState } from 'react'

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LifePointContainer from './LifePointContainer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

function App() {
  const [playerName1, setPLayerName1] = useState('Player 1')
  const [playerName2, setPLayerName2] = useState('Player 2')
  const [lifePoint1, setLifePoint1] = useState(8000)
  const [lifePoint2, setLifePoint2] = useState(8000)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ButtonAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Grid flexGrow={1} container spacing={12} maxHeight={false} alignItems="center" justifyContent="center">
          <Grid size={6}>
            <LifePointContainer playerName={playerName1} lifePoint={lifePoint1} />
          </Grid>
          <Grid size={6}>
            <LifePointContainer playerName={playerName2} lifePoint={lifePoint2} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

function ButtonAppBar() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Duel Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}



export default App
