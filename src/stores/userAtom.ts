import { atom } from 'jotai';
import { Profile } from '../types/profile';

export const userAtom = atom<Omit<Profile, "bookings">>(); 