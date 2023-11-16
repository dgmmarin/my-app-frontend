import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { UsersWrapper } from './Users.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useListUsersMutation } from '../../redux/slices/userApiSlice';
import { setUsers } from '../../redux/slices/usersSlice';
import { Button } from 'react-bootstrap';
import * as _ from 'lodash';


interface UsersProps { }

const Users: FC<UsersProps> = () => {
   const dispatch = useDispatch();
   const { users } = useSelector((state: any) => state.users);
   const [usersList, setUsersList] = useState([{}]);
   const [listUsers, { isLoading }] = useListUsersMutation();
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
      if (!isLoading && !_.isEqual(users, usersList)) {
         fetchUsers().then((users) => console.log("fetched users"));
      }
      interval.current = setInterval(async () => {
         await fetchUsers()
      }, 5000);

      return () => {
         if (interval.current) {
            clearInterval(interval.current);
         }
         console.log("cleanup");
      };
   }, [users, isLoading, usersList, fetchUsers, dispatch, listUsers]);
   console.log("rendering users", usersList);

   return <UsersWrapper data-testid="Users">
      <Button onClick={() => fetchUsers()}>X</Button>
   </UsersWrapper >
}
export default Users;
