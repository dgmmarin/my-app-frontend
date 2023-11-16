import React, { FC } from 'react';
import { NavbarWrapper } from './Navbar.styled';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
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
					<Nav className="me-auto">
						{userInfo ? (
							<>
								<Nav.Link as={Link} to="/">Home</Nav.Link>
								<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
								{userInfo.roles.includes('admin') ? (
									<>
										<Nav.Link as={Link} to="/users">Users</Nav.Link>
									</>
								) : null}
								<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={Link} to="/login">Login</Nav.Link>
								<Nav.Link as={Link} to="/register">Register</Nav.Link>
							</>
						)}

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</NavbarWrapper>
}

export default Header;
