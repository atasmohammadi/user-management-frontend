// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'employees',
    path: '/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'departments',
    path: '/departments',
    icon: icon('ic_blog'),
  },
  {
    title: 'logs',
    path: '/logs',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
