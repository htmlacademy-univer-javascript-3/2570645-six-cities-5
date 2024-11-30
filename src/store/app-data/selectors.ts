import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { SortOptions } from '../../const';

export const getCity = (state: State): string => state[NameSpace.App].city;
export const getSortOption = (state: State): SortOptions => state[NameSpace.App].sortOption;
export const getError = (state: State): string | null => state[NameSpace.App].error;
