import './List.css';
import { useEffect, useState } from 'react';
import { ISimpleChar } from '../Interfaces';
import { mockChars } from '../utils/mocks';
import { ImageList, ImageListItem, Pagination } from '@mui/material';
// import { getChars } from '../utils/ApiService';

function List() {
  const [characters, setCharacters] = useState<ISimpleChar[]>(mockChars);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    /*
    getChars()
      .then((res) => {
        if (!res.data) return Promise.reject(res.error);
        setCharacters(res.data);
      })
      .catch((err) => console.error('In List:', err));*/
  }, []);

  function handleChange(e: React.ChangeEvent<unknown>, pageNum: number) {
    setPage(pageNum);
  }

  return (
    <main className="list-container">
      <ImageList sx={{ width: '80%' }} cols={5} rowHeight={100}>
        {characters.map((ch) => {
          return (
            <ImageListItem key={ch.id} style={{ height: '100%' }}>
              <img
                src={`${ch.thumbnail.path}.${ch.thumbnail.extension}`}
                onClick={() => console.log('hey')}
              />
              <h1 className="list-item__header">{ch.name}</h1>
            </ImageListItem>
          );
        })}
      </ImageList>
      <Pagination
        color="secondary"
        page={page}
        onChange={handleChange}
        count={10}
        size="large"
        sx={{ marginTop: '10px' }}
        variant="outlined"
      />
    </main>
  );
}

export default List;
