import { useState } from 'react';

import { palette } from '@mui/system';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#424242',
    opcaity: 2,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LifePointCalculator({ currentLifePoint, setLifePoint }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newLifePoint, setNewLifePoint] = useState(currentLifePoint);

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>Calculate</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Calculator
                    </Typography>
                    <TextField
                        id="outlined-number"
                        label="Life Point Change"
                        type="number"
                        onChange={(event) => {
                            let newLP = currentLifePoint + Number(event.target.value)
                            setNewLifePoint(newLP)
                        }}
                    />
                    <Grid flexGrow={1} container spacing={12} maxHeight={false} alignItems="center" justifyContent="center">
                        <Grid size={6}>
                            <Typography variant="h6" component="div">
                                Current LP
                            </Typography>
                            <Typography variant="h6" component="div">
                                {currentLifePoint}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h6" component="div">
                                Updated LP
                            </Typography>
                            <Typography variant="h6" component="div">
                                {newLifePoint}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button variant='contained' onClick={() => {
                        setLifePoint(newLifePoint);
                        handleClose();
                    }}> Confirm Change</Button>
                </Box>
            </Modal>
        </>
    );
}

export default LifePointCalculator