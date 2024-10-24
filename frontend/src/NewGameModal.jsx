import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function NewGameModal({ player1, setPlayerName1, player2, setPlayerName2 }) {
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const [internalPlayer1Name, setInternalPlayerName1] = useState('');
    const [internalPlayer2Name, setInternalPlayerName2] = useState('');
    // React.useEffect(() => {
    //     setPlayerName1(player1)
    //     setPlayerName2(player2)
    // }, [player1, player2])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Button variant='contained' onClick={openModal}>Create A New Duel</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={4}>
                        <TextField id="outlined-basic" label="Player 1 Name" variant="outlined" onChange={(e) => {setInternalPlayerName1(e.target.value)}}></TextField>
                        <TextField id="outlined-basic" label="Player 2 Name" variant="outlined" onChange={(e) => {setInternalPlayerName2(e.target.value)}}></TextField>
                        <Button variant='contained' onClick={() => {
                            selectPlayerToPlayFirst({ player1: player1, player2: player2 });
                            setPlayerName1(internalPlayer1Name);
                            setPlayerName2(internalPlayer2Name);
                            closeModal();
                        }}> Duel </Button>
                    </Stack>

                </Box>
            </Modal>
        </>
    );
}

function selectPlayerToPlayFirst({ player1, player2 }) {
    let coinFlip = Math.random()
    if (coinFlip < 0.5) {
        console.debug("Coin flip probability: " + coinFlip)
        return player1
    } else {
        console.debug("Coin flip probability: " + coinFlip)
        return player2
    }
}

export default NewGameModal