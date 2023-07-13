import './Modal.css';
import { Modal } from '@mui/base';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
} from '@mui/material';
import useStore from '../utils/Store';
import { useEffect, useState } from 'react';
import { getCharInfo } from '../utils/ApiService';
import { ICharacters } from '../Interfaces';

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
          backgroundColor: 'blue',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button onClick={onClose}>CLOSE</button>
        {charInfo ? (
          <Card>
            <CardMedia
              sx={{ height: 200 }}
              image={`${charInfo.thumbnail.path}.${charInfo.thumbnail.extension}`}
              title={charInfo.name}
            />
            <CardContent>
              <h1 style={{ textAlign: 'center', color: 'black' }}>
                {charInfo.name}
              </h1>
              <p style={{ textAlign: 'center', color: 'black' }}>
                {charInfo.description}
              </p>
              <div className="modal__grid-wrapper">
                <h2 className="modal__grid-wrapper_header">Comics:</h2>
                <Grid
                  container
                  className="modal__grid"
                  spacing={{ md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    overflow: 'scroll',
                  }}
                >
                  {charInfo.comics.items.map((comic, index) => (
                    <Grid
                      className="modal__grid-item"
                      item
                      xs={2}
                      sm={4}
                      md={4}
                      key={index}
                    >
                      <h3>
                        {comic.name}
                      </h3>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </CardContent>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Modal>
  );
}

export default InfoModal;
