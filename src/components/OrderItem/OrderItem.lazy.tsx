import React, { lazy, Suspense } from 'react';

const LazyOrderItem = lazy(() => import('./OrderItem'));

const OrderItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrderItem {...props} />
  </Suspense>
);

export default OrderItem;
