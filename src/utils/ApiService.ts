import {
  ICharacters,
  IErrorResponse,
  IHashify,
  IMarvelResponse,
  ISimpleChar,
} from './Interfaces';
const privKey = String(import.meta.env.VITE_PRIVATE_API_KEY);
const pubKey = String(import.meta.env.VITE_PUBLIC_API_KEY);

async function genHash(ts: number) {
  const data = `${ts}${privKey + pubKey}`;
  try {
    const res = await fetch(
      `https://api.hashify.net/hash/md5/hex?value=${data}`
    );
    const { Digest } = (await res.json()) as IHashify;
    return Digest;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
}
/*
async function getChars(page: number) {
  try {
    const ts = Date.now();
    const hash = await genHash(ts);

    if (!hash)
      return { data: null, error: 'Error when getting the characters' };

    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&offset=${
        page * 20
      }ts=${ts}&apikey=${pubKey}&hash=${hash}`
    );
    const data = (await res.json()) as IMarvelResponse | IErrorResponse;

    if (data.code > 400) throw new Error(data.status);

    let characters: ISimpleChar[] = [];
    let total = 0;
    if ('data' in data) {
      characters = data.data.results.map((char) => {
        const newChar = {
          id: char.id,
          name: char.name,
          thumbnail: char.thumbnail,
        };
        return newChar;
      });
      total = data.data.total;
    }

    return { data: { characters, total }, error: null };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return { data: null, error: 'Error when getting the characters' };
  }
}
*/
/*async function getCharInfo(id: number) {
  try {
    const ts = Date.now();
    const hash = await genHash(ts);

    if (!hash)
      return { data: null, error: 'Error when getting the characters' };

    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${id}ts=${ts}&apikey=${pubKey}&hash=${hash}`
    );
    const data = (await res.json()) as IMarvelResponse | IErrorResponse;

    if (data.code > 400) throw new Error(data.status);
    let characters: ICharacters[] = [];
    let total = 0;
    if ('data' in data) {
      characters = data.data.results;
      total = data.data.total;
    }
    return { data: { characters, total }, error: null };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return { data: null, error: 'Error when getting the characters' };
  }
}*/

async function fetchMarvel(path: string) {
  try {
    const ts = Date.now();
    const hash = await genHash(ts);

    if (!hash)
      return { data: null, error: 'Error when getting the character/s' };

    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters${path}ts=${ts}&apikey=${pubKey}&hash=${hash}`
    );
    const data = (await res.json()) as IMarvelResponse | IErrorResponse;

    if (data.code > 400) throw new Error(data.status);
    let characters: ICharacters[] = [];
    let total = 0;
    if ('data' in data) {
      characters = data.data.results;
      total = data.data.total;
    }
    return { data: { characters, total }, error: null };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return { data: null, error: 'Error when getting the character/s' };
  }
}

async function getChars(page: number) {
  const path = `?orderBy=modified&offset=${page * 20}`;
  const data = await fetchMarvel(path);
  if (data.data) {
    const parsedChars = data.data.characters.map((char) => {
      const newChar = {
        id: char.id,
        name: char.name,
        thumbnail: char.thumbnail,
      };
      return newChar;
    });
    return {
      data: {
        characters: parsedChars,
        total: data.data.total,
      },
      error: null,
    };
  }
  return data;
}

async function getCharInfo(id: number) {
  const path = `/${id}?`;
  const data = await fetchMarvel(path);
  return data;
}

export { getChars, getCharInfo };
