import * as React from 'react';
import { getCommentText } from './utils';
import { ColorKind, TiCommentOld, TiCommentNew } from './types';

export interface DetailsProps {
  title: string;
  kind: string;
  description: TiCommentOld | TiCommentNew;
  color?: ColorKind;
  id?: string;
  children?: React.ReactNode;
}

export const Details: React.FC<DetailsProps> = ({ title, kind, description, children, id, color = 'primary' }) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);
  const text = getCommentText(description);

  return (
    <div id={id} className={`type-info type-info-${color}`}>
      <div className="type-title" onClick={toggleOpen} title="Click to toggle details">
        <b>{kind}</b>
        <h3>{title}</h3>
        {text && <span className="block">{text}</span>}
      </div>
      <div className={open ? 'type-details open' : 'type-details close'}>{children}</div>
    </div>
  );
};
