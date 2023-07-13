import '../Styles/Header.css';

type HeaderProps = {
  open: boolean;
};

function Header({ open }: HeaderProps) {
  return (
    <header
      style={{
        filter: open ? 'blur(10px)' : '',
        pointerEvents: open ? 'none' : undefined,
      }}
    >
      <img src="./Marvel_Logo.svg" height="70%" alt="Marvel Logo" />
      <h1>Wiki</h1>
    </header>
  );
}

export default Header;
