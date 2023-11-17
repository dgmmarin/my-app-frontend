import React, { lazy, Suspense } from 'react';

const LazyPermission = lazy(() => import('./Permission'));

const Permission = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPermission {...props} />
  </Suspense>
);

export default Permission;
