import Home from '@/pages/Home';
import Rewards from '@/pages/Rewards/Rewards';
import Team from '@/pages/Team';
import Champions from '@/pages/Champions/Champions';

const routes = [
  {
    path: '/',
    label: 'Home',
    page: <Home />,
  },
  {
    path: '/champions',
    label: 'Champions',
    page: <Champions />,
  },
  {
    path: '/team',
    label: 'Team',
    page: <Team />,
  },
  {
    path: '/rewards',
    label: 'Rewards',
    page: <Rewards />,
  },
];

export default routes;
