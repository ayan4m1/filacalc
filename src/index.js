import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';

import Layout from 'components/Layout';
import SettingsProvider from 'components/SettingsProvider';
import SuspenseFallback from 'components/SuspenseFallback';
import ErrorBoundary from 'components/ErrorBoundary';

const createRouteForPage = (pathOrIndex, pageName) => {
  const result = {};

  if (typeof pathOrIndex === 'boolean') {
    result.index = pathOrIndex;
  } else if (typeof pathOrIndex === 'string') {
    result.path = pathOrIndex;
  }

  result.lazy = async () => ({
    Component: (await import(`components/${pageName}`)).default
  });

  return result;
};
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      createRouteForPage(true, 'Home'),
      createRouteForPage('filament', 'FilamentUsage'),
      {
        path: '/spool',
        children: [
          createRouteForPage('weight', 'SpoolWeight'),
          createRouteForPage('dimensions', 'SpoolDimensions')
        ]
      },
      createRouteForPage('extruder', 'ExtruderCalibration'),
      createRouteForPage('flow', 'VolumetricFlow'),
      createRouteForPage('z-axis', 'ZAxisCalibration'),
      createRouteForPage('spools', 'SpoolDatabase')
    ]
  }
]);
const root = createRoot(document.getElementById('root'));

root.render(
  <SettingsProvider>
    <Suspense fallback={<SuspenseFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </SettingsProvider>
);
