import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ImageCardProps {
  image: string;
  title: string;
  imageClass?: string;
  description: React.ReactNode;
  details?: React.ReactNode;
  link: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, title, description, details, link, imageClass }) => (
  <Link to={link} className={`card image-card text-center${details ? ' details' : ''}`}>
    <div className="image">
      <img className={imageClass} src={image} alt={title} />
    </div>
    <h5>{title}</h5>
    <div>
      <p>{description}</p>
    </div>
    {details && <div className="card-details">{details}</div>}
  </Link>
);
