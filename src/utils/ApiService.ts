import {
  IErrorResponse,
  IHashify,
  IMarvelResponse,
  ISimpleChar,
} from '../Interfaces';
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

async function getChars() {
  try {
    const ts = Date.now();
    const hash = await genHash(ts);

    if (!hash)
      return { data: null, error: 'Error when getting the characters' };

    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${pubKey}&hash=${hash}`
    );
    const data = (await res.json()) as IMarvelResponse | IErrorResponse;

    if (data.code > 400) throw new Error(data.status);

    let characters: ISimpleChar[] = [];

    if ('data' in data) {
      characters = data.data.results.map((char) => {
        const newChar = {
          id: char.id,
          name: char.name,
          thumbnail: char.thumbnail,
        };
        return newChar;
      });
    }

    return { data: characters, error: null };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return { data: null, error: 'Error when getting the characters' };
  }
}

export { getChars };
