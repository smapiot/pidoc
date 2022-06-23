import * as React from 'react';
import { TiComment } from './types';

export interface CommentProps {
  comment: TiComment;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const text = comment && comment.shortText;

  if (!text) {
    return null;
  }

  return <span className="block comment">{text}</span>;
};
