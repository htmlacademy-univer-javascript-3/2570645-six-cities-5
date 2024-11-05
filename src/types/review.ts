import {User} from './user.ts';

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};
