import Home from '@/pages/Home';
import Rewards from '@/pages/Rewards/Rewards';
import Team from '@/pages/Team';

const routes = [
  {
    path: '/',
    page: <Home />,
  },
  {
    path: '/team',
    page: <Team />,
  },
  {
    path: '/rewards',
    page: <Rewards />,
  },
];

export default routes;
