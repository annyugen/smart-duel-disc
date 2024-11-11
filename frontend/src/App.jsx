import { useState } from 'react'

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LifePointContainer from './LifePointContainer';
import PostGamePopup from './PostGamePopup';
import NewGameModal from './NewGameModal';
import WebcamContainer from './WebcamContainer';

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
  const [playerName1, setPlayerName1] = useState('Player 1')
  const [playerName2, setPlayerName2] = useState('Player 2')
  const [lifePoint1, setLifePoint1] = useState(4000)
  const [lifePoint2, setLifePoint2] = useState(4000)
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [isGameOver, setIsGameOver] = useState(false)

  if (lifePoint1 <= 0) {
    setWinner(playerName2)
    setLoser(playerName1)
    setLifePoint1(1) // without this going to be a infinite loop bug. TODO: Find a better way to achieve this
    setIsGameOver(true)
  } else if (lifePoint2 <= 0) {
    setWinner(playerName1)
    setLoser(playerName2)
    setLifePoint2(1)
    setIsGameOver(true)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <ButtonAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <NewGameModal player1={playerName1} setPlayerName1={setPlayerName1} player2={playerName2} setPlayerName2={setPlayerName2}/>
        <Grid flexGrow={1} container spacing={12} maxHeight={false} alignItems="center" justifyContent="center">
          <Grid size={6}>
            <LifePointContainer playerName={playerName1} setPlayerName={setPlayerName1} lifePoint={lifePoint1} setLifePoint={setLifePoint1} />
          </Grid>
          <Grid size={6}>
            <LifePointContainer playerName={playerName2} setPlayerName={setPlayerName2} lifePoint={lifePoint2} setLifePoint={setLifePoint2}/>
          </Grid>
        </Grid>
        <WebcamContainer/>
        <PostGamePopup 
          winner={winner}
          loser={loser}
          isGameOver={isGameOver}
        />
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
