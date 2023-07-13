import { Modal } from '@mui/base';
import { Box } from '@mui/material';

type InfoModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function InfoModal({ open, setOpen }: InfoModalProps) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: '50vw',
          height: '80vh',
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: 'blue',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button onClick={() => setOpen(false)}>CLOSE</button>
        <h1 style={{ textAlign: 'center' }}>Hey</h1>
      </Box>
    </Modal>
  );
}

export default InfoModal;
