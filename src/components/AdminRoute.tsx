import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (userInfo.roles.includes('admin')) ? <Outlet /> : <Navigate to='/' replace />;
};
export default AdminRoute;