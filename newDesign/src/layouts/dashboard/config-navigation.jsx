import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: '질문 설정',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: '대화 내역',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '병원 정보',
    path: '/',
    icon: icon('ic_cart'),
  }

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
