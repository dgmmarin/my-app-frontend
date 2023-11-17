import React, { lazy, Suspense } from 'react';

const LazyRolesPermissions = lazy(() => import('./RolesPermissions'));

const RolesPermissions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRolesPermissions {...props} />
  </Suspense>
);

export default RolesPermissions;
