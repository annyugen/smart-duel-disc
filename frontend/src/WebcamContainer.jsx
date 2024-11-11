import { useState, useRef } from 'react'
import Container from '@mui/material/Container';
import { ToggleButton, Typography } from '@mui/material';

const WebcamContainer = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [webcamToggled, setWebcamToggled] = useState(false);
    const videoConfig = {
        video: true,
        audio: false,
    }

    const startWebcam = async () => {
        navigator.mediaDevices.getUserMedia(videoConfig)
            .then((stream) => {
                videoRef.current.srcObject = stream;
                setStream(stream);
            })
            .catch((e) => {
                console.error(`Error getting user media: ${e}`)
            })
    }

    const stopWebcam = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }

    return (
        <Container>
            <ToggleButton
                value="check"
                selected={webcamToggled}
                onChange={() => {
                    console.log("Webcam Toggled")
                    setWebcamToggled((prevSelected) => !prevSelected)
                    webcamToggled ? startWebcam() : stopWebcam()
                }}
            >
                <Typography>Toggle Webcam</Typography>
            </ToggleButton>
            <video ref={videoRef} autoPlay playsInline ></video>
        </Container>
    )
}

export default WebcamContainer