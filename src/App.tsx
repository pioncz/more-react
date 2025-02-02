import { Route, Routes } from 'react-router';
import Navigation from './components/Navigation/Navigation';
import { AnimatePresence, motion } from 'motion/react';
import globalStyles from './utils/globalStyles';
import routes from './utils/routes';
import Page from './components/Page/Page';

const App = () => {
  globalStyles();

  return (
    <>
      <Navigation />
      <Page>
        <Routes>
          {routes.map(({ path, page }) => (
            <Route
              key={path}
              path={path}
              element={
                <AnimatePresence mode="popLayout">
                  <motion.div
                    initial={{
                      opacity: 0,
                      transform: 'translateY(-50px)',
                    }}
                    animate={{
                      opacity: 1,
                      transform: 'translateY(0)',
                    }}
                    exit={{
                      opacity: 0,
                      transform: 'translateY(50px) scale(0.95)',
                    }}
                    key={path}
                  >
                    {page}
                  </motion.div>
                </AnimatePresence>
              }
            />
          ))}
        </Routes>
      </Page>
    </>
  );
};

export default App;
