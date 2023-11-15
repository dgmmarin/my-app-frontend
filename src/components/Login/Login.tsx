import React, { FC, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { LoginWrapper } from './Login.styled';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
   };

   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(`Email: ${email}, Password: ${password}`);
   };

   return (
      <LoginWrapper data-testid="Login">
         <div>
            <h4>Login form</h4>
         </div>
         <Container className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label style={{ float: 'left' }}>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
               </Form.Group>

               <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
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
      </LoginWrapper>
   );
};

export default Login;
