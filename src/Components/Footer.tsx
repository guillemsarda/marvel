import '../Styles/Footer.css';

type FooterProps = {
  open: boolean;
};

function Footer({ open }: FooterProps) {
  return (
    <footer
      style={{
        filter: open ? 'blur(10px)' : '',
        pointerEvents: open ? 'none' : undefined,
      }}
    >
      <h3>Made by Guillem Sardà Parreu</h3>
    </footer>
  );
}

export default Footer;
