import React from 'react';

interface LinkItemProps {
  url: string | null;
  iconClassName: string;
  styleClassName?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({
  url,
  iconClassName,
  styleClassName,
}) => {
  if (!url) return null;

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styleClassName}
    >
      <i className={iconClassName} aria-hidden='true'></i>
    </a>
  );
};

export default LinkItem;