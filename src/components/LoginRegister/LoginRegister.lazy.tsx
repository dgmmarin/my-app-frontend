import React, { lazy, Suspense } from 'react';

const LazyLoginRegister = lazy(() => import('./LoginRegister'));

const LoginRegister = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLoginRegister {...props} />
  </Suspense>
);

export default LoginRegister;
