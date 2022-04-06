import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import SuspenseFallback from 'components/SuspenseFallback';

const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ 'components/Home')
);
const FilamentUsage = lazy(() =>
  import(/* webpackChunkName: "filament" */ 'components/FilamentUsage')
);
const SpoolUsage = lazy(() =>
  import(/* webpackChunkName: "spool" */ 'components/SpoolUsage')
);
const ExtruderCalibration = lazy(() =>
  import(/* webpackChunkName: "extruder" */ 'components/ExtruderCalibration')
);
const VolumetricFlow = lazy(() =>
  import(/* webpackChunkName: "flow" */ 'components/VolumetricFlow')
);
const ZAxisCalibration = lazy(() =>
  import(/* webpackChunkName: "zaxis" */ 'components/ZAxisCalibration')
);

export default function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
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
    </Suspense>
  );
}
