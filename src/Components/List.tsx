import './List.css';
import { useEffect, useState } from 'react';
import { ISimpleChar } from '../Interfaces';
import { mockChars } from '../utils/mocks';
import { CircularProgress, ImageList, Pagination } from '@mui/material';
import { getChars } from '../utils/ApiService';
import ListItem from './ListItem';

type ListProps = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  open: boolean;
};

function List({ setError, setLoading, loading, setOpen, open }: ListProps) {
  const [characters, setCharacters] = useState<ISimpleChar[]>(mockChars);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // getChars(page - 1)
    //   .then((res) => {
    //     if (!res.data) return Promise.reject(res.error);
    //     setCharacters(res.data.characters);
    //     setTotal(Math.floor(res.data.total / 20));
    //   })
    //   .catch(setError)
    //   .finally(() => setLoading(false));
    setTimeout(() => setLoading(false), 500);
  }, [page, setLoading, setError]);

  function handleChange(e: React.ChangeEvent<unknown>, pageNum: number) {
    setPage(pageNum);
  }

  function handleClick() {
    setOpen(true)
  }
  return (
    <main
      className="list-container"
      style={{
        filter: open ? 'blur(10px)' : '',
        pointerEvents: open ? 'none' : undefined,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ImageList sx={{ width: '80%' }} cols={5} rowHeight={100}>
            {characters.map((ch) => {
              return <ListItem character={ch} key={ch.id} handleClick={handleClick}/>;
            })}
          </ImageList>
          <Pagination
            color="secondary"
            page={page}
            onChange={handleChange}
            count={total}
            size="large"
            sx={{ marginTop: '10px' }}
            variant="outlined"
          />
        </>
      )}
    </main>
  );
}

export default List;
