import CanvasPage from 'pages/CanvasPage';
import PokeManPage from 'pages/PokemanPage';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import GlobalStyle from 'styles';

const Home = lazy(() => import('pages/Home'));

const App: React.FC = () => (
  <main>
    <GlobalStyle />
    <Suspense fallback={<span>loading</span>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokeman" element={<PokeManPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
      </Routes>
    </Suspense>
  </main>
);

export default App;
