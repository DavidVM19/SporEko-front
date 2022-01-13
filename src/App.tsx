import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { HashRouter, Route, Routes } from 'react-router-dom';

import HomeDesktop from './components/desktop/Home/HomeDesktop';
import Connection from './components/mobile/connection/Connection';
import Home from './components/mobile/Home/Home';
import Footer from './components/mobile/layout/Footer';

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <div className="App">
      {isTabletOrMobile && (
        <HashRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connection" element={<Connection />} />
          </Routes>
          <Footer />
        </HashRouter>
      )}
      {isDesktopOrLaptop && (
        <HashRouter basename="/">
          <Routes>
            <Route path="/" element={<HomeDesktop />} />
          </Routes>
        </HashRouter>
      )}
    </div>
  );
}

export default App;
