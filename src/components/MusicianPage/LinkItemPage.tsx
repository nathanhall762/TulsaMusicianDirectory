import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  transition: all var(--animation-speed-medium) ease;
  &:hover {
    transform: scale(1.5);
  }
`;

const BandcampLink = styled(Link)`
  &:hover {
    color: var(--bandcamp-color);
  }
`;

const SoundcloudLink = styled(Link)`
  &:hover {
    color: var(--soundcloud-color);
  }
`;

const SpotifyLink = styled(Link)`
  &:hover {
    color: var(--spotify-color);
  }
`;

const YoutubeLink = styled(Link)`
  &:hover {
    color: var(--youtube-color);
  }
`;

const InstagramLink = styled(Link)`
  &:hover {
    color: var(--instagram-color);
  }
`;

const FacebookLink = styled(Link)`
  &:hover {
    color: var(--facebook-color);
  }
`;

const TwitterLink = styled(Link)`
  &:hover {
    color: var(--twitter-color);
  }
`;

const TiktokLink = styled(Link)`
  &:hover {
    color: var(--tiktok-color);
  }
`;

const TwitchLink = styled(Link)`
  &:hover {
    color: var(--twitch-color);
  }
`;

const ThreadsLink = styled(Link)`
  &:hover {
    color: var(--threads-color);
  }
`;

const linkIconMap = {
  bandcamp: BandcampLink,
  soundcloud: SoundcloudLink,
  spotify: SpotifyLink,
  youtube: YoutubeLink,
  instagram: InstagramLink,
  facebook: FacebookLink,
  twitter: TwitterLink,
  tiktok: TiktokLink,
  twitch: TwitchLink,
  threads: ThreadsLink,
};

type LinkStyleClassNames = keyof typeof linkIconMap;

interface LinkItemProps {
  url: string | null;
  iconClassName: string;
  styleClassName: LinkStyleClassNames;
}

const LinkItem: React.FC<LinkItemProps> = ({
  url,
  iconClassName,
  styleClassName,
}) => {
  if (!url) return null;

  // LinkIcon is a styled component from linkComponentMap
  const LinkIcon = linkIconMap[styleClassName] || Link;

  return (
    <LinkIcon
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={styleClassName}
    >
      <i className={iconClassName} aria-hidden='true'></i>
    </LinkIcon>
  );
};

export default LinkItem;
