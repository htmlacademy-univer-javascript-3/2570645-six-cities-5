import { Link } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logout} from '../../store/api-actions.ts';

function HeaderNav(): JSX.Element{
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  const favoritesCount = useAppSelector((state) =>
    state.offers.filter((offer) => offer.isFavorite).length
  );


  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <div className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <>
                <Link to={AppRoute.Favorites}>
                  <span className="header__user-name user__name">{userEmail}</span>
                  <span className="header__favorite-count">{favoritesCount}</span>
                </Link>
                <Link to="#" className="header__nav-link" onClick={handleSignOut}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </>
            ) : (
              <Link to={AppRoute.Login} className="header__nav-link">Login</Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
