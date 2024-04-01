import {
  useAppDispatch,
  useAppSelector,
  useResponseState,
} from '../../../hook';
import { useEffect } from 'react';
import {
  accountOperations,
  accountSelectors,
} from '../../../store/slices/account';
import { authOperations, authSelectors } from '../../../store/slices/auth';
import { PageLoader } from '../../ui';
import { Navigate, Outlet } from 'react-router-dom';
import { appRoutes } from '../../../constants';

const AuthenticateGuard = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data, error } = useAppSelector(
    accountSelectors.accountDetails,
  );

  const { tokens } = useAppSelector(authSelectors.login);

  const authRefreshTokenState = useResponseState();

  useEffect(() => {
    if (error) {
      authRefreshTokenState.loading();
      dispatch(authOperations.authRefreshToken())
        .unwrap()
        .then(() => authRefreshTokenState.success())
        .catch((e) => authRefreshTokenState.hasError(e));
    }
  }, [error]);

  useEffect(() => {
    dispatch(accountOperations.fetchMyAccountDetails());
  }, []);

  if (isLoading || !!authRefreshTokenState.isLoading) {
    return <PageLoader />;
  } else {
    if (data && tokens) {
      return <Outlet />;
    } else if (!tokens) {
      return <Navigate to={appRoutes.LOGIN} />;
    }
  }
  return null;
};

export default AuthenticateGuard;
