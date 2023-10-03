import { create } from 'zustand';
import { UserData } from './types';
import { Musician } from './types';

interface BearState {
  user: UserData;
  musicians: Musician[];
  setUser: (user: UserData) => void;
  setMusicians: (musicians: Musician[]) => void;
}

const useBearStore = create<BearState>()((set) => ({
  user: {} as UserData,
  musicians: [],
  setUser: (user) => set({ user: user }),
  setMusicians: (musicians) => set({ musicians: musicians }),
}));

export default useBearStore;
