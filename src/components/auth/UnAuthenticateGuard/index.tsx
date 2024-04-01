import { Navigate, Outlet } from 'react-router-dom';

import { appRoutes, common } from '../../../constants';
import { cookies } from '../../../utils';

const UnAuthenticateGuard = () => {
  const token = cookies.get(common.KEY_ACCESS_TOKEN);

  if (!token) {
    return <Outlet />;
  } else {
    return <Navigate to={appRoutes.HOME} />;
  }
};

export default UnAuthenticateGuard;
