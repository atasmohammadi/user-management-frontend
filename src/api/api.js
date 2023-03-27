import * as auth from './auth';
import * as user from './user';
import * as employee from './employee';
import * as department from './department';
import * as log from './log';

export default {
  ...auth,
  ...user,
  ...employee,
  ...department,
  ...log,
};
