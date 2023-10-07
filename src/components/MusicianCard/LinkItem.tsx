import styles from '../../css/MusicianCard.module.css';

interface LinkItemProps {
  linkName: string;
  url: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ linkName: name, url }) => {
  const extractBandcampURL = (iframeString: string): string => {
    const match = iframeString.match(
      /href="(https:\/\/.*?\.bandcamp\.com)\/.*?"/
    );
    return match ? match[1] : '';
  };

  const extractSoundcloudProfileURL = (embedCode: string): string => {
    const match = embedCode.match(
      /<a href="(https:\/\/soundcloud\.com\/[^"]+)"/
    );
    return match ? match[1] : '';
  };

  if (name === 'bandcamp') url = extractBandcampURL(url);
  if (name === 'soundcloud') url = extractSoundcloudProfileURL(url);
  if (!url) return null;

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styles[name + 'Link']}
    >
      <i className={`fa fa-${name}`} aria-hidden='true'></i>
    </a>
  );
};

export default LinkItem;
