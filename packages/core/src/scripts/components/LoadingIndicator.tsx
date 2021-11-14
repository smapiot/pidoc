import * as React from 'react';

export interface LoadingIndicatorProps {}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => (
  <div className="app-center">
    <div className="spinner circles">Loading ...</div>
  </div>
);
