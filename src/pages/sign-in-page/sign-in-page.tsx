import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/route';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { login } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getAuthError, getAuthStatus } from '../../store/reducers/user/user';
import { AuthorizationStatus } from '../../types/authorization';
import { validateEmail } from '../../utils/validate-email';
import { validatePassword } from '../../utils/validate-password';

const SignInPage: FC = () => {
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (authStatus === AuthorizationStatus.Auth) {
    navigate(RoutePaths.Main);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useAppSelector(getAuthError);
  const message = error?.details.map((d) => d.messages.join(', ')).join('. ');
  const errors = error?.details.map((d) => d.property) ?? [];

  const handleOnSubmit = () => {
    if (validateEmail(email) && validatePassword(password)) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={RoutePaths.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={(e) => e.preventDefault()} className="sign-in__form">
          {message && (
            <div className="sign-in__message">
              <p>{message}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div
              className={[
                'sign-in__field',
                errors.includes('email') ? 'sign-in__field--error' : '',
              ].join(' ')}
            >
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div
              className={[
                'sign-in__field',
                errors.includes('password') ? 'sign-in__field--error' : '',
              ].join(' ')}
            >
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              onClick={handleOnSubmit}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;
