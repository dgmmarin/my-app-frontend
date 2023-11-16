import React, { lazy, Suspense } from 'react';

const LazyCategories = lazy(() => import('./Categories'));

const Categories = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCategories {...props} />
  </Suspense>
);

export default Categories;
