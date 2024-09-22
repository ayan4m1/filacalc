import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';

import Layout from 'components/Layout';
import SettingsProvider from 'components/SettingsProvider';
import SuspenseFallback from 'components/SuspenseFallback';

const Home = lazy(() => import('components/Home'));
const FilamentUsage = lazy(() => import('components/FilamentUsage'));
const SpoolWeight = lazy(() => import('components/SpoolWeight'));
const SpoolDimensions = lazy(() => import('components/SpoolDimensions'));
const ExtruderCalibration = lazy(
  () => import('components/ExtruderCalibration')
);
const VolumetricFlow = lazy(() => import('components/VolumetricFlow'));
const ZAxisCalibration = lazy(() => import('components/ZAxisCalibration'));
const SpoolDatabase = lazy(() => import('components/SpoolDatabase'));

const root = createRoot(document.getElementById('root'));

root.render(
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
  </SettingsProvider>
);
