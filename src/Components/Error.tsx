type ErrorProps = {
  error: string | null;
};

function Error({ error }: ErrorProps) {
  return (
    <main
      style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{fontWeight: '400'}}>{error}</h1>
    </main>
  );
}

export default Error;
