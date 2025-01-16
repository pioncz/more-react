import background from './assets/bg.jpg';
import { Link, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Team from './pages/Team';
import Rewards from './pages/Rewards/Rewards';
import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  ':root': {
    fontFamily:
      'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: '1.5',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.87)',
    background: `linear-gradient(
          rgba(0, 0, 20, 0.8), 
          rgba(10, 0, 0, 0.9)
        ), url(${background}), #080808`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',

    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  body: {
    margin: 0,
    display: 'flex',
    placeItems: 'center',
    minWidth: '320px',
    minHeight: '100vh',
  },
  '#root': {
    maxWidth: '1280px',
    width: 'calc(100vw - 1rem)',
    margin: '0 auto',
    textAlign: 'center',
  },
});

const App = () => {
  globalStyles();

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/team">Team</Link>
      <Link to="/rewards">Rewards</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  );
};

export default App;
