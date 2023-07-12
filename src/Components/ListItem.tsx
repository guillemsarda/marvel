import './ListItem.css';
import { ImageListItem } from '@mui/material';
import { ISimpleChar } from '../Interfaces';
import { useState } from 'react';

type ListItemProps = {
  character: ISimpleChar;
};

function ListItem({ character }: ListItemProps) {
  const isAvailable = !character.thumbnail.path.includes('not_available');
  const [showHeader, setShowHeader] = useState<boolean>(!isAvailable);

  return (
    <ImageListItem
      className="list-item"
     
      style={{ height: '200px' }}
    >
      <button
        className="list-item__button"
        style={{
          backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`,
          filter: !isAvailable || showHeader ? 'blur(5px) brightness(0.5)' : '',
        }}
        onClick={() => console.log('hey')}
        onMouseOver={() => isAvailable && setShowHeader(true)}
        onMouseOut={() => isAvailable && setShowHeader(false)}
        onLoad={() => console.log('loading')}
      ></button>
      <h2 className="list-item__header" style={{ opacity: showHeader ? 1 : 0 }}>
        {character.name}
      </h2>
    </ImageListItem>
  );
}

export default ListItem;
