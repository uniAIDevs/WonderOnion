import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '../constants';
import { Auth, Dashboard } from '../layout';
import {
  NotFoundPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  Home,
  MyAccount,
  OnionWebsites,
  WebClones,
  WebsiteReports,
} from '../pages';
import { AuthenticateGuard, UnAuthenticateGuard } from '../components/auth';

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route element={<AuthenticateGuard />}>
        <Route element={<Dashboard />}>
          <Route path={appRoutes.HOME} element={<Home />} />
          <Route path={appRoutes.MY_ACCOUNT} element={<MyAccount />} />
          <Route path={appRoutes.ONION_WEBSITES} element={<OnionWebsites />} />
          <Route path={appRoutes.WEB_CLONES} element={<WebClones />} />
          <Route path={appRoutes.WEBSITE_REPORTS} element={<WebsiteReports />} />
        </Route>
      </Route>
      <Route element={<UnAuthenticateGuard />}>
        <Route element={<Auth />}>
          <Route path={appRoutes.LOGIN} element={<Login />} />
          <Route path={appRoutes.SIGN_UP} element={<Register />} />
          <Route
            path={appRoutes.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={appRoutes.RESET_PASSWORD}
            element={<ResetPassword />}
          />
          <Route path={appRoutes.EMAIL_VERIFY} element={<VerifyEmail />} />
        </Route>
      </Route>
      <Route
        path={appRoutes.NOT_FOUND_PAGE}
        element={
          <NotFoundPage
            title="404: Page Not Found"
            subTitle="The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
