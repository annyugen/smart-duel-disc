import React, { useState } from 'react';

import { palette } from '@mui/system';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import kaibaDefeat from '/assets/KaibaDefeat.mp4';
import joeyVictory from '/assets/JoeyVictory.mp4'


const defeatStyle = {
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: '#424242',
    opcaity: 2,
    boxShadow: 24,
    p: 4,
};

const victoryStyle = {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: '#424242',
    opcaity: 2,
    boxShadow: 24,
    p: 4,
};

function PostGamePopup({ winner, loser, isGameOver }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setOpen(isGameOver)
    }, [isGameOver])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={defeatStyle}>
                    <Grid flexGrow={1} container spacing={12} maxHeight={false} alignItems="center" justifyContent="center">
                        <Grid size={6} container  direction={"column"} sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Typography variant='h5'>{loser}</Typography>
                            <video style={{ alignContent: 'center' }} controls autoPlay loop width="70%" className="videoPlayer" src={kaibaDefeat}></video>
                        </Grid>
                        <Grid size={6} container  direction={"column"} sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Typography variant='h5'>{winner}</Typography>
                            <video controls autoPlay loop width="70%" className="videoPlayer" src={joeyVictory}></video>
                        </Grid>
                    </Grid>
                </Box>

            </Modal>
        </>
    );
}

export default PostGamePopup