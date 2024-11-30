import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity } from '../../store/app-data/app-data';
import { getCity } from '../../store/app-data/selectors';

type CitiesListProps = {
  cities: string[];
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
