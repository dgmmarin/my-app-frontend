/* eslint-disable react/style-prop-object */
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users/Users';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './components/Categories/Categories';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';
import Roles from './components/Roles/Roles';
import { useSelector } from 'react-redux';
import LoginRegister from './components/LoginRegister/LoginRegister';
import OrderShow from './components/OrderShow/OrderShow';


function App() {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <div className="border-end bg-white d-none d-md-block" id="sidebar-wrapper" style={{
          position: "fixed",
          width: "200px",
          zIndex: "1000",
          left: "0",
          top: "55px",
          borderRight: "1px solid #162636",
          height: "100%"
        }}>
          <div className="list-group list-group-flush">
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Shortcuts</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Overview</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
            <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
          </div>
        </div>
        {userInfo ?
          <>
            <Header />
          </>
          :
          null
        }
        <Container className='elements' style={{ marginTop: "30px", }}>
          <Routes>
            <Route path="" element={<PrivateRoute />}>
              <Route path="" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<OrderShow />} />
              <Route path="categories" element={<Categories />} />

              <Route path="" element={<AdminRoute />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<Profile></Profile>} />
                <Route path="users/:userId/orders" element={<Orders></Orders>} />
                <Route path="roles" element={<Roles />} />
              </Route>
            </Route>
            <Route path="login-register" element={<LoginRegister />} />
          </Routes>
        </Container>
      </BrowserRouter >
    </div >
  );
}
export default App;
