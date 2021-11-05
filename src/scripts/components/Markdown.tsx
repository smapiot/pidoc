import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from 'piral-core';

export interface MarkdownProps {
  content: string;
  link?: string;
  editLabel?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content, link, editLabel = 'Edit' }) => {
  const publicUrl = useGlobalState((s) => s.docs.basePath);
  const history = useHistory();
  const adjustLinks = (container: HTMLDivElement) => {
    if (container) {
      const links = container.querySelectorAll('a');

      links.forEach((link) => {
        const path = link.getAttribute('href');

        if (path.indexOf(publicUrl) === 0) {
          link.addEventListener('click', (ev) => {
            ev.preventDefault();
            history.push(path);
          });
        }
      });
    }
  };

  return (
    <>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} ref={adjustLinks} />
      {link && (
        <div className="markdown-edit">
          <a href={link} target="_blank" rel="noopener">
            <i className="fas fa-pen" /> {editLabel}
          </a>
        </div>
      )}
    </>
  );
};
