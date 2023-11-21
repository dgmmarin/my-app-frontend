import React, { FC, useState } from 'react';
import { LoginRegisterWrapper } from './LoginRegister.styled';
import { Tabs, Tab } from 'react-bootstrap';
import Register from '../Register/Register';
import Login from '../Login/Login';

interface LoginRegisterProps { }

const LoginRegister: FC<LoginRegisterProps> = () => {
   const [key, setKey] = useState('login');

   return (
      <div className="container d-flex justify-content-center" style={{ marginTop: "100px" }}>
         <LoginRegisterWrapper data-testid="LoginRegister">
            <Tabs
               id="controlled-tab-example"
               activeKey={key}
               onSelect={(k: any) => setKey(k)}
               className="mb-3"
               fill
            >
               <Tab eventKey="login" title="Login">
                  <Login />
               </Tab>
               <Tab eventKey="register" title="Register">
                  <Register />
               </Tab>

            </Tabs>
         </LoginRegisterWrapper>
      </div>

   );
}

export default LoginRegister;
