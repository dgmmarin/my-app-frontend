import React, { lazy, Suspense } from 'react';

const LazyProducts = lazy(() => import('./Products'));

const Products = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProducts {...props} />
  </Suspense>
);

export default Products;
