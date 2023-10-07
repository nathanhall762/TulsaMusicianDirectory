import React from 'react';
import styles from '../../css/MusicianCard.module.css';
import LinkItem from './LinkItem';

interface LinkContainerProps {
  linkInfo: string[][];
  title: string;
}

const LinkContainer: React.FC<LinkContainerProps> = ({ linkInfo, title }) => {
  return (
    <>
      {title !== '' && <h4>{title}</h4>}
      <div className={styles.socialLinks}>
        {linkInfo.map(([linkName, url]) => (
          <LinkItem linkName={linkName} url={url} />
        ))}
      </div>
    </>
  );
};

export default LinkContainer;
