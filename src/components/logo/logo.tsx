import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {memo} from 'react';

function Logo(): JSX.Element{
  return (
    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Main}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}
const MemoizedLogo = memo(Logo);
export default MemoizedLogo;