import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity } from '../../store/app-data/app-data';
import { getCity } from '../../store/app-data/selectors';
import {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';

type CitiesListProps = {
  cities: string[];
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);

  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(changeCity(city));
    },
    [dispatch]
  );

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <Link
            className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`}
            onClick={() => handleCityChange(city)}
            to="#"
            role={'link'}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCitiesList = memo(CitiesList);

export default MemoizedCitiesList;
