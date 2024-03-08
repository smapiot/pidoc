import * as React from 'react';
import { getCommentText } from './utils';
import { TiCommentNew, TiCommentOld } from './types';

export interface CommentProps {
  comment: TiCommentOld | TiCommentNew;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const text = getCommentText(comment);
  
  if (!text) {
    return null;
  }

  return <span className="block comment">{text}</span>;
};
