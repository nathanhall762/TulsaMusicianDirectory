import { UserCredential } from 'firebase/auth';

export type Musician = {
  name: string;
  music: {
    bandcamp: string;
    spotify: string;
    youtube: string;
    soundcloud: string;
    twitch: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    threads: string;
  };
  genre: string[];
  profileImage: string;
};

export type OutletContextProps = {
  musicians: Musician[];
  user: UserCredential | void;
  setUser: React.Dispatch<React.SetStateAction<void | UserCredential>>;
};
