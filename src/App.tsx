import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users/Users';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container style={{ marginTop: "30px" }}>
          <Routes >
            <Route path="" element={<PrivateRoute />}>
              <Route path="" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="" element={<AdminRoute />}>
                <Route path="users" element={<Users></Users>} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div >
  );
}
export default App;
