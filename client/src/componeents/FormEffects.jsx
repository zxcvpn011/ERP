import React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Box, Collapse } from '@mui/material';

export default function FormEffects({setOpenModal, alertProps, openModal}) {
  const handleCloseModal = () => setOpenModal(false);
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
    <Box>
      <Collapse in={alertProps.open}>
        <Alert variant="filled" severity={alertProps.severity} sx={{
          position: 'fixed', top: 0, right: 0, left: 0
        }}>{alertProps.text}</Alert>
      </Collapse>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Saving Product Please Wait
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CircularProgress />
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
