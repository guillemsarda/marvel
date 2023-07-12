import { useEffect, useState } from 'react';
import { ISimpleChar } from '../Interfaces';
import { getChars } from '../utils/ApiService';

function List() {
  const [characters, setCharacters] = useState<ISimpleChar[]>([]);

  useEffect(() => {
    getChars()
      .then((res) => {
        if (!res.data) return Promise.reject(res.error);
        setCharacters(res.data);
      })
      .catch((err) => console.error('In List:', err));
  }, []);
  return characters.map((ch) => <h1>{ch.name}</h1>);
}

export default List;
