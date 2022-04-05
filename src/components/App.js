import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Home from 'components/Home';
import FilamentUsage from 'components/FilamentUsage';
import SpoolUsage from 'components/SpoolUsage';
import ExtruderCalibration from 'components/ExtruderCalibration';
import VolumetricFlow from 'components/VolumetricFlow';
import ZAxisCalibration from 'components/ZAxisCalibration';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/filament" element={<FilamentUsage />} />
        <Route path="/spool" element={<SpoolUsage />} />
        <Route path="/extruder" element={<ExtruderCalibration />} />
        <Route path="/flow" element={<VolumetricFlow />} />
        <Route path="/z-axis" element={<ZAxisCalibration />} />
      </Route>
    </Routes>
  );
}
