import React, { lazy, Suspense } from 'react';

const LazyPagination = lazy(() => import('./Pagination'));

const Pagination = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPagination setPage={() => { }} totalPages={0} perPage={0} currentPage={0} {...props} />
  </Suspense>
);

export default Pagination;
