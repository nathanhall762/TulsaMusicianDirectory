import styled from 'styled-components';
import { logEvent } from 'firebase/analytics';

const Link = styled.a<{ $linkName: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  transition: all var(--animation-speed-medium) ease;
  &:hover {
    transform: scale(1.5);
    color: var(--${(props) => props.$linkName}-color);
  }
`;

interface LinkItemProps {
  url: string | null;
  iconClassName: string;
  styleClassName: string;
}

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  // Call logEvent here
  logEvent(analytics, 'connection_made');
};

const LinkItem: React.FC<LinkItemProps> = ({
  url,
  iconClassName,
  styleClassName,
}) => {
  if (!url) return null;

  return (
    <Link
      href={url}
      onClick={handleClick}
      target='_blank'
      rel='noopener noreferrer'
      $linkName={styleClassName}
      aria-label={styleClassName}
    >
      <i className={iconClassName} aria-hidden='true'></i>
    </Link>
  );
};

export default LinkItem;
