// Auth Routes
const LOGIN = '/login';
const SIGN_UP = '/register';
const FORGOT_PASSWORD = '/forgot-password';
const RESET_PASSWORD = '/reset-password';
const EMAIL_VERIFY = '/verify-email';

// Authorized Routes
const HOME = '/';
const MY_ACCOUNT = '/my-account';

// Modules
const ONION_WEBSITES = '/onionWebsites';
const WEB_CLONES = '/webClones';
const WEBSITE_REPORTS = '/websiteReports';

const NOT_FOUND_PAGE = '*';

export default {
  // Auth
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  EMAIL_VERIFY,

  // Dashboard
  HOME,
  MY_ACCOUNT,

  // Modules
  ONION_WEBSITES,
  WEB_CLONES,
  WEBSITE_REPORTS,

  NOT_FOUND_PAGE,
};
