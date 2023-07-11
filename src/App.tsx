import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => { 
    // fetch(
    //   'https://gateway.marvel.com:443/v1/public/characters?ts=1689022610400&apikey=393405dc2f5f6d95a36f969695df5637&hash=acef72c7c9f3cc6136dc5b9d860b078c'
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
