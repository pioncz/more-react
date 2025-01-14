import reactLogo from './assets/react.svg'
import background from './assets/bg.jpg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Team from './pages/Team'
import Rewards from './pages/Rewards'
import { globalCss } from './stitches.config'

const globalStyles = globalCss({
  ':root': { 
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: '1.5',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.87)',
    background: `linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
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
  'body': {
    margin: 0,
    display: 'flex',
    placeItems: 'center',
    minWidth: '320px',
    minHeight: '100vh',
  },
  '#root': {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  }
});

const App = () => {
  globalStyles();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  )
}

export default App
