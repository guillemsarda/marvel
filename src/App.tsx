import { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import List from './Components/List';
import Error from './Components/Error';
import InfoModal from './Components/InfoModal';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  function setView() {
    if (error) return <Error error={error} />;
    return (
      <List
        setError={setError}
        setLoading={setLoading}
        loading={loading}
        setOpen={setOpen}
        open={open}
      />
    );
  }

  return (
    <div className="main">
      <Header open={open} />
      {setView()}
      <Footer open={open} />
      <InfoModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
