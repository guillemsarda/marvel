import './ListItem.css';
import { ImageListItem } from '@mui/material';
import { ISimpleChar } from '../Interfaces';
import { SyntheticEvent, useState } from 'react';
import useStore from '../utils/Store';

type ListItemProps = {
  character: ISimpleChar;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ListItem({ character, setOpen }: ListItemProps) {
  const isAvailable = !character.thumbnail.path.includes('not_available');
  const [showHeader, setShowHeader] = useState<boolean>(!isAvailable);
  const { methods } = useStore();

  function handleClick() {
    setOpen(true);
    methods.setModalId(character.id);
  }

  function handleMouseMove(e: SyntheticEvent) {
    if (isAvailable && e.type === 'mouseover') setShowHeader(true);
    else if (isAvailable && e.type === 'mouseout') setShowHeader(false);
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
