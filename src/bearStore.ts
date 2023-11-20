import { create } from 'zustand';
import { UserData } from './global';
import { Musician } from './global';

interface BearState {
  user: UserData | null;
  musicians: Musician[];
  genreFilter: string[];
  searchFilter: string;
  openNav: 'search' | 'hamburger' | '';
  setUser: (user: UserData | null) => void;
  setMusicians: (musicians: Musician[]) => void;
  setGenreFilter: (genres: string[]) => void;
  setSearchFilter: (search: string) => void;
  setOpenNav: (nav: 'search' | 'hamburger' | '') => void;
}

const useBearStore = create<BearState>()((set) => ({
  user: null,
  musicians: [],
  genreFilter: [],
  searchFilter: '',
  openNav: '',
  setUser: (user) => set({ user: user }),
  setMusicians: (musicians) => set({ musicians: musicians }),
  setGenreFilter: (genres) => set({ genreFilter: genres }),
  setSearchFilter: (search) => set({ searchFilter: search }),
  setOpenNav: (nav) => set({ openNav: nav }),
}));

export default useBearStore;
