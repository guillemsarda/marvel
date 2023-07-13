import '../Styles/InfoCard.css';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { ICharacters } from '../utils/Interfaces';

type InfoCardProps = {
  charInfo: ICharacters;
};

function InfoCard({ charInfo }: InfoCardProps) {
  return (
    <Card>
      <CardMedia
        sx={{
          height: 300,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        image={`${charInfo.thumbnail.path}.${charInfo.thumbnail.extension}`}
        title={charInfo.name}
      />
      <CardContent sx={{ padding: '25px' }}>
        <h1 style={{ textAlign: 'center', color: 'var(--red)' }}>
          {charInfo.name}
        </h1>
        <p className="modal__paragraph">{charInfo.description}</p>
        <div className="modal__grid-wrapper">
          <h2 className="modal__grid-wrapper_header">Comics:</h2>
          <Grid
            container
            className="modal__grid"
            spacing={{ md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
              overflowY: 'scroll',
            }}
          >
            {charInfo.comics.items.map((comic, index) => (
              <Grid
                className="modal__grid-item"
                item
                xs={2}
                sm={4}
                md={4}
                key={index}
              >
                <h3>{comic.name}</h3>
              </Grid>
            ))}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
