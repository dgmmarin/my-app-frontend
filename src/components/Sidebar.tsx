import SidebarMenu, { SidebarMenuNavLink } from 'react-bootstrap-sidebar-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/userApiSlice';
import SidebarMenuSubCollapse from 'react-bootstrap-sidebar-menu';
import { Alert, Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
const Sidebar = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout({}));
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
    <Button variant="primary" className="d-lg-none" onClick={handleShow}>
      Toggle Menu
    </Button>

    <Alert variant="info" className="d-none d-lg-block">
      Resize your browser to show the responsive offcanvas toggle.
    </Alert>

    <Offcanvas show={show} onHide={handleClose} responsive="lg">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="mb-0">
          This is content within an <code>.offcanvas-lg</code>.
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  </>
}

export default Sidebar;
