import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';

import Layout from 'components/Layout';
import SettingsProvider from 'components/SettingsProvider';
import SuspenseFallback from 'components/SuspenseFallback';

const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ 'components/Home')
);
const FilamentUsage = lazy(() =>
  import(/* webpackChunkName: "filament" */ 'components/FilamentUsage')
);
const SpoolWeight = lazy(() =>
  import(/* webpackChunkName: "spool" */ 'components/SpoolWeight')
);
const SpoolDimensions = lazy(() =>
  import(/* webpackChunkName: "spool" */ 'components/SpoolDimensions')
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

ReactDOM.render(
  <SettingsProvider>
    <Router>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index />
            <Route element={<FilamentUsage />} path="filament" />
            <Route path="/spool">
              <Route element={<SpoolWeight />} path="weight" />
              <Route element={<SpoolDimensions />} path="dimensions" />
            </Route>
            <Route element={<ExtruderCalibration />} path="extruder" />
            <Route element={<VolumetricFlow />} path="flow" />
            <Route element={<ZAxisCalibration />} path="z-axis" />
            <Route element={<SpoolDatabase />} path="spools" />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </SettingsProvider>,
  document.getElementById('root')
);
