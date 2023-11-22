import React, { lazy, Suspense } from 'react';

const LazyOrderShow = lazy(() => import('./OrderShow'));

const OrderShow = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrderShow {...props} />
  </Suspense>
);

export default OrderShow;
