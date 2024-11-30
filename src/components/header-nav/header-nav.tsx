import { Link } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logout} from '../../store/api-actions.ts';
import {useEffect } from 'react';
import { getAuthorizationStatus, getUserEmail } from '../../store/user-process/selectors';
import { getFavoritesCount } from '../../store/offers-data/selectors';
import { saveEmail } from '../../store/user-process/user-process';

function HeaderNav(): JSX.Element{
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const favoritesCount = useAppSelector(getFavoritesCount);


  const handleSignOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && !userEmail) {
      dispatch(saveEmail(savedEmail));
    }
  }, [dispatch, userEmail]);

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
