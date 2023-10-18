import { create } from 'zustand';
import { UserData } from './types';
import { Musician } from './types';

interface BearState {
  user: UserData;
  musicians: Musician[];
  genreFilter: string[];
  setUser: (user: UserData) => void;
  setMusicians: (musicians: Musician[]) => void;
  setGenreFilter: (genres: string[]) => void;
}

const useBearStore = create<BearState>()((set) => ({
  user: {} as UserData,
  musicians: [],
  genreFilter: [],
  setUser: (user) => set({ user: user }),
  setMusicians: (musicians) => set({ musicians: musicians }),
  setGenreFilter: (genres) => set({ genreFilter: genres }),
}));

export default useBearStore;
