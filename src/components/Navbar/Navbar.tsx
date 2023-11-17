import React, { FC } from 'react';
import { NavbarWrapper } from './Navbar.styled';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
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
	return <NavbarWrapper data-testid="Navbar">
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						{userInfo ? (

							<Nav.Link as={Link} to="/" className='ml-2'>Home</Nav.Link>
						) : null}
						{userInfo && userInfo.roles.includes('admin') ? (
							<>
								<Nav.Link as={Link} to="/users" className='ml-2'>Users</Nav.Link>
								<Nav.Link as={Link} to="/roles" className='ml-2'>Roles</Nav.Link>
							</>
						) : null}
						{userInfo ? (
							<>
								<Nav.Link as={Link} to="/orders" className='ml-2'>Orders</Nav.Link>
								<Nav.Link as={Link} to="/products" className='ml-2'>Products</Nav.Link>
								<Nav.Link as={Link} to="/categories" className='ml-2'>Categories</Nav.Link>

							</>
						) : null}
					</Nav>
				</Navbar.Collapse>
				{userInfo ? (
					<>
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
				) : (
					<>
						<Nav.Link as={Link} to="/login"> <FaSignInAlt /> Sign In</Nav.Link>
						<Nav.Link as={Link} to="/register"><FaSignOutAlt /> Sign Up</Nav.Link>
					</>
				)}
			</Container>
		</Navbar>
	</NavbarWrapper>
}

export default Header;
