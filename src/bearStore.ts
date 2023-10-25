import { create } from 'zustand';
import { UserData } from './types';
import { Musician } from './types';

interface BearState {
  user: UserData;
  musicians: Musician[];
  genreFilter: string[];
  searchFilter: string;
  openNav: 'search' | 'hamburger' | '';
  setUser: (user: UserData) => void;
  setMusicians: (musicians: Musician[]) => void;
  setGenreFilter: (genres: string[]) => void;
  setSearchFilter: (search: string) => void;
  setOpenNav: (nav: 'search' | 'hamburger' | '') => void;
}

const useBearStore = create<BearState>()((set) => ({
  user: {} as UserData,
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
