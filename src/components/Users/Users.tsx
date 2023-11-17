import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { UsersWrapper } from './Users.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useListUsersMutation } from '../../redux/slices/userApiSlice';
import { setUsers } from '../../redux/slices/usersSlice';
import { Col, Row, Table } from 'react-bootstrap';
import * as _ from 'lodash';
import { FaCalendar, FaCheck, FaEye, FaFile, FaUserCircle, FaUserNinja } from 'react-icons/fa';
import { Link } from 'react-router-dom';


interface UsersProps { }

const Users: FC<UsersProps> = () => {
   const dispatch = useDispatch();
   const { users } = useSelector((state: any) => state.users);
   const [usersList, setUsersList] = useState({} as any);
   const [listUsers, { isLoading, error }] = useListUsersMutation();
   const interval = useRef<NodeJS.Timer | null>(null);
   const fetchUsers = useCallback(async () => {
      try {
         const res = await listUsers({}).unwrap();
         console.log(res);
         setUsersList({ ...res });
         dispatch(setUsers({ ...res }));
      } catch (error) {
         console.log(error);
      }
   }, [listUsers, dispatch, setUsersList]);

   useEffect(() => {
      if (!isLoading && !_.isEqual(users, usersList) && !error) {
         fetchUsers().then((users) => console.log("fetched users"));
      }
      interval.current = setInterval(async () => {
         await fetchUsers()
      }, 15000);

      return () => {
         if (interval.current) {
            clearInterval(interval.current);
         }
         console.log("cleanup");
      };
   }, [users, isLoading, usersList, fetchUsers, dispatch, listUsers, error]);
   return <UsersWrapper data-testid="Users">
      <Table responsive>
         <thead>
            <tr>
               <th>#</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Email</th>
               <th>Roles</th>
               <th>Active</th>
               <th>Orders</th>
               <th>Created At</th>
            </tr>
         </thead>
         <tbody>
            {Object.keys(usersList).map((key, index) => {
               return <tr key={index}>
                  <td><Link to={"/users/" + usersList[key].uuid} ><FaEye></FaEye> </Link></td>
                  <td>{usersList[key].firstName}</td>
                  <td>{usersList[key].lastName}</td>
                  <td>{usersList[key].email}</td>
                  <td>{Object.keys(usersList[key].roles).map((k, i) => usersList[key].roles[k].name === 'admin'
                     ? <FaUserNinja className='mx-2' style={{ color: 'red' }} />
                     : <FaUserCircle className='mx-2' style={{ color: 'blue' }} />)
                  }
                  </td>
                  <td><FaCheck
                     style={{ color: usersList[key].active ? "green" : "grey" }}
                     onMouseOver={({ target }) => (target as HTMLElement).style.color = "blue"}
                     onMouseOut={({ target }) => (target as HTMLElement).style.color = usersList[key].active ? "green" : "grey"}
                  >
                  </FaCheck></td>
                  <td><Link to={"/users/" + usersList[key].uuid + "/orders"}>
                     <FaFile
                        onMouseOver={({ target }) => (target as HTMLElement).style.color = "blue"}
                        onMouseOut={({ target }) => (target as HTMLElement).style.color = "grey"}
                        style={{ color: 'grey' }}>
                     </FaFile>
                  </Link></td>
                  <td>{usersList[key].createdAt}</td>
               </tr>
            })}
         </tbody >
      </Table>
   </UsersWrapper >
}
export default Users;
