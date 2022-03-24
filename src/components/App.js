import { Routes, Route } from 'react-router-dom';

import Home from 'components/Home';
import FilamentUsage from 'components/FilamentUsage';
import SpoolUsage from 'components/SpoolUsage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filament" element={<FilamentUsage />} />
      <Route path="/spool" element={<SpoolUsage />} />
    </Routes>
  );
}
