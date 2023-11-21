import React, { FC, useEffect, useState } from 'react';
import { RegisterWrapper } from './Register.styled';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../redux/slices/userApiSlice';
import { toast } from 'react-toastify';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
	const [validated, setValidated] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [register] = useRegisterMutation();

	const onChangePassword = (e: any) => {
		setPassword(e.target.value);
	}
	const onChangePasswordConfirm = (e: any) => {
		setPasswordConfirm(e.target.value);
	}
	const onChangeEmail = (e: any) => {
		setEmail(e.target.value);
	}
	const onChangeFirstName = (e: any) => {
		setFirstName(e.target.value);
	}
	const onChangeLastName = (e: any) => {
		setLastName(e.target.value);
	}

	const clearForm = () => {
		setPassword('');
		setPasswordConfirm('');
		setEmail('');
		setFirstName('');
		setLastName('');
	}

	const handleSubmit = (event: any) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
		try {
			const res = register({ "email": email, "password": password, "firstName": firstName, "lastName": lastName }).unwrap();
			console.log(res);
			navigate('/login');
			toast.success('Registration successful');
		} catch (error) {
			console.log(error);
			toast.error('Registration failed');
		}
	};

	useEffect(() => {
		if (password !== passwordConfirm) {
			console.log('passwords do not match')
		}
		console.log(firstName)
	}, [firstName, lastName, email, password, passwordConfirm]);

	return <RegisterWrapper data-testid="Register">
		<Container className='justify-content-center'>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicFirstName">
					<Form.Label style={{ float: 'left' }}>First Name</Form.Label>
					<Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={onChangeFirstName} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicLastName">
					<Form.Label style={{ float: 'left' }}>Last Name</Form.Label>
					<Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={onChangeLastName} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label style={{ float: 'left' }}>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label style={{ float: 'left' }}>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
					<Form.Label style={{ float: 'left' }}>Password Confirmation</Form.Label>
					<Form.Control type="password" placeholder="Password Confirmation" value={passwordConfirm} onChange={onChangePasswordConfirm} />
				</Form.Group>

				<div className='container mt-4'>
					<Row>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Row>
				</div>
			</Form>
		</Container>
	</RegisterWrapper >
}

export default Register;
