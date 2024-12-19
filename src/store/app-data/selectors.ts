import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { SortOptions } from '../../const';

export const getCity = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].city;
export const getSortOption = (state: Pick<State, NameSpace.App>): SortOptions => state[NameSpace.App].sortOption;
