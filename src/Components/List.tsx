import './List.css';
import { useEffect, useState } from 'react';
import { ISimpleChar } from '../Interfaces';
import { mockChars } from '../utils/mocks';
import { ImageList, ImageListItem, Pagination } from '@mui/material';
// import { getChars } from '../utils/ApiService';

function List() {
  const [characters, setCharacters] = useState<ISimpleChar[]>(mockChars);

  useEffect(() => {
    /*
    getChars()
      .then((res) => {
        if (!res.data) return Promise.reject(res.error);
        setCharacters(res.data);
      })
      .catch((err) => console.error('In List:', err));*/
  }, []);
  return (
    <>
      <ImageList sx={{ width: '80%', height: '80%' }} cols={4} rowHeight={500}>
        {characters.map((ch) => {
          return (
            <ImageListItem key={ch.id}>
              <img
                src={`${ch.thumbnail.path}.${ch.thumbnail.extension}`}
                onClick={() => console.log('hey')}
              />
              <h1 className="list-item__header">{ch.name}</h1>
            </ImageListItem>
          );
        })}
      </ImageList>
      <Pagination />
    </>
  );
}

export default List;
