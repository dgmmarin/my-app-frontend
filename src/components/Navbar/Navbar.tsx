import React, { FC, useState } from 'react';
import { NavbarWrapper } from './Navbar.styled';
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserNinja } from 'react-icons/fa';
interface NavbarProps { }

const Header: FC<NavbarProps> = () => {
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
	return <NavbarWrapper data-testid="Navbar">
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				{userInfo ? (
					<>
						<Navbar.Toggle aria-controls="basic-navbar-nav" className='' onClick={() => handleShow()} />
						<Navbar.Offcanvas id="basic-navbar-nav" show={show} onHide={handleClose}>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title>Menu</Offcanvas.Title>
							</Offcanvas.Header>

							<Nav className="ml-auto" onClick={() => handleClose()}>
								{userInfo ? (
									<Nav.Link as={Link} to="/" className='mx-3'>Home</Nav.Link>
								) : null}
								{userInfo && userInfo.roles.includes('admin') ? (
									<>
										<Nav.Link as={Link} to="/users" className='mx-3'>Users</Nav.Link>
										<Nav.Link as={Link} to="/roles" className='mx-3'>Roles</Nav.Link>
									</>
								) : null}
								{userInfo ? (
									<>
										<Nav.Link as={Link} to="/orders" className='mx-3'>Orders</Nav.Link>
										<Nav.Link as={Link} to="/products" className='mx-3'>Products</Nav.Link>
										<Nav.Link as={Link} to="/categories" className='mx-3'>Categories</Nav.Link>

									</>
								) : null}
							</Nav>
						</Navbar.Offcanvas>
						<NavDropdown className=""
							title={userInfo.name} id='username'
						>
							<NavDropdown.Item>
								<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
							</NavDropdown.Item>
							<NavDropdown.Item onClick={logoutHandler}>
								<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
							</NavDropdown.Item>
						</NavDropdown>
					</>
				) : null}
			</Container>
		</Navbar >
	</NavbarWrapper >
}

export default Header;
