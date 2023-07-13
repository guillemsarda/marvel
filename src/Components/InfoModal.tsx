import '../Styles/InfoModal.css';
import { Modal } from '@mui/base';
import { Box, CircularProgress } from '@mui/material';
import useStore from '../utils/Store';
import { useEffect, useState } from 'react';
import { getCharInfo } from '../utils/ApiService';
import { ICharacters } from '../utils/Interfaces';
import InfoCard from './InfoCard';
import xMark from '../assets/xmark-solid.svg';

type InfoModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function InfoModal({ open, setOpen }: InfoModalProps) {
  const [charInfo, setCharInfo] = useState<ICharacters | undefined>();
  const { storeStates, methods } = useStore();

  useEffect(() => {
    if (storeStates.modalId) {
      getCharInfo(storeStates.modalId as number)
        .then((res) => {
          if (!res.data) return Promise.reject(res.error);
          setCharInfo(res.data.characters[0]);
        })
        .catch((e) => console.log(e));
    }
  }, [storeStates.modalId]);

  function onClose() {
    setOpen(false);
    methods.setModalId(null);
    setCharInfo(undefined);
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
          transform: 'translate(-50%, -50%)',
        }}
      >
        {charInfo ? (
          <>
            <button className="modal__button_close" onClick={onClose}>
              <img src={xMark} height={'100%'} />
            </button>
            <InfoCard charInfo={charInfo} />
          </>
        ) : (
          <div className="modal__div_loader-wrapper">
            <CircularProgress sx={{}} />
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default InfoModal;
