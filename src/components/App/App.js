import { Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../redux/auth/auth-operations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.module.css';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicRoute from '../PublicRoute/PublicRoute';

const HomeView = lazy(() =>
  import('../../views/HomeView' /* webpackChunkName: "home-view" */),
);
const SignUpView = lazy(() =>
  import('../../views/SignUpView' /* webpackChunkName: "sign-up-view" */),
);

const LoginView = lazy(() =>
  import('../../views/LoginView' /* webpackChunkName: "login-view" */),
);

const PhoneView = lazy(() =>
  import('../../views/PhoneView' /* webpackChunkName: "phone-view" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="Container">
      <AppBar />
      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute exact path="/signup" restricted>
              <SignUpView />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted redirectTo="/contacts">
              <LoginView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <PhoneView />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer />
    </div>
  );
}
