import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';
import { FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from '../../store/api-actions.ts';
import { Link, useNavigate } from 'react-router-dom';
import {AppRoute, AuthorizationStatus, Cities} from '../../const.ts';
import { getCity } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {toast} from 'react-toastify';
import {changeCity} from '../../store/app-data/app-data.ts';

function LoginScreen(): JSX.Element{
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const city = useAppSelector(getCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    const randomCity = Cities[Math.floor(Math.random() * Cities.length)];
    dispatch(changeCity(randomCity));

    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate, dispatch]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
      if (!passwordRegex.test(password)) {
        toast.warn('The password must contain at least one letter and one digit.');
        return;
      }

      dispatch(
        login({
          email,
          password,
        })
      );
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
