import { Modal } from '@mui/base';
import { Box } from '@mui/material';
import useStore from '../utils/Store';
import { useEffect } from 'react';

type InfoModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function InfoModal({ open, setOpen }: InfoModalProps) {
  const { storeStates, methods } = useStore();

  useEffect(() => {
    console.log(storeStates.modalId);
  }, [storeStates]);

  function onClose() {
    setOpen(false);
    methods.setModalId(null);
  }

  return (
    <Modal open={open} onClose={onClose}>
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
        <button onClick={onClose}>CLOSE</button>
        <h1 style={{ textAlign: 'center' }}>{storeStates.modalId}</h1>
        <h1 style={{ textAlign: 'center' }}>Hey</h1>
        <h1 style={{ textAlign: 'center' }}>Hey</h1>
      </Box>
    </Modal>
  );
}

export default InfoModal;
