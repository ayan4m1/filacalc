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
const SpoolDatabase = lazy(() =>
  import(/* webpackChunkName: "spools" */ 'components/SpoolDatabase')
);

export default function App() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<FilamentUsage />} path="/filament" />
          <Route element={<SpoolUsage />} path="/spool" />
          <Route element={<ExtruderCalibration />} path="/extruder" />
          <Route element={<VolumetricFlow />} path="/flow" />
          <Route element={<ZAxisCalibration />} path="/z-axis" />
          <Route element={<SpoolDatabase />} path="/spools" />
        </Route>
      </Routes>
    </Suspense>
  );
}
