import './ListItem.css';
import { ImageListItem } from '@mui/material';
import { ISimpleChar } from '../Interfaces';
import { useState } from 'react';

type ListItemProps = {
  character: ISimpleChar;
  handleClick: () => void;
};

function ListItem({ character, handleClick }: ListItemProps) {
  const isAvailable = !character.thumbnail.path.includes('not_available');
  const [showHeader, setShowHeader] = useState<boolean>(!isAvailable);

  function handleMouseMove() {
    isAvailable && setShowHeader(!showHeader);
  }

  return (
    <ImageListItem className="list-item" style={{ height: '200px' }}>
      <button
        className="list-item__button"
        style={{
          backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`,
          filter: !isAvailable || showHeader ? 'blur(5px) brightness(0.5)' : '',
        }}
        onClick={handleClick}
        onMouseOver={handleMouseMove}
        onMouseOut={handleMouseMove}
      ></button>
      <h2 className="list-item__header" style={{ opacity: showHeader ? 1 : 0 }}>
        {character.name}
      </h2>
    </ImageListItem>
  );
}

export default ListItem;
