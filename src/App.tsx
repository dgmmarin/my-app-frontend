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
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Container style={{ marginTop: "30px" }}>
          <Routes>
            <Route path="" element={<PrivateRoute />}>
              <Route path="" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="categories" element={<Categories />} />

              <Route path="" element={<AdminRoute />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<Profile></Profile>} />
                <Route path="users/:userId/orders" element={<Orders></Orders>} />
                <Route path="roles" element={<Roles />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter >
    </div >
  );
}
export default App;
