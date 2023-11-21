import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { UsersWrapper } from './Users.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useListUsersMutation } from '../../redux/slices/userApiSlice';
import { setUsers } from '../../redux/slices/usersSlice';
import { Table } from 'react-bootstrap';
import * as _ from 'lodash';
import { FaCheck, FaEye, FaFile, FaUserCircle, FaUserNinja } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomPagination from '../Pagination/Pagination';


interface UsersProps { }

const Users: FC<UsersProps> = () => {
   const dispatch = useDispatch();
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);
   const [totalPages, setTotalPages] = useState(0);
   const { users } = useSelector((state: any) => state.users);
   const [usersList, setUsersList] = useState({} as any);
   const [listUsers, { isLoading, error }] = useListUsersMutation();
   const interval = useRef<NodeJS.Timer | null>(null);

   const changePage = (event: any, page: number) => {
      console.log(page)
      setPage(page);
      fetchUsers(page, perPage)
   }

   const fetchUsers = useCallback(async (page: number, perPage: number) => {
      try {
         const res = await listUsers({ page: page, perPage: perPage }).unwrap();
         console.log(res);
         setUsersList(res.data);
         setPage(res.meta.page);
         setPerPage(res.meta.limit);
         setTotalPages(res.meta.pages);
         dispatch(setUsers({ ...res }));
      } catch (error) {
         console.log(error);
      }
   }, [listUsers, dispatch, setUsersList, setPage, setPerPage, setTotalPages]);

   useEffect(() => {
      if (!isLoading && !_.isEqual(users, usersList) && !error) {
         fetchUsers(page, perPage).then((users) => console.log("fetched users"));
      }
      interval.current = setInterval(async () => {
         if (!isLoading && !_.isEqual(users, usersList) && !error) {
            fetchUsers(page, perPage).then((users) => console.log("fetched users inside interval"));
         }
      }, 15000);

      return () => {
         if (interval.current) {
            clearInterval(interval.current);
         }
      };
   }, [users, isLoading, usersList, fetchUsers, dispatch, listUsers, error, page, perPage, setPage, setPerPage, setTotalPages]);
   return <UsersWrapper data-testid="Users">
      <div>
         <Table responsive bordered hover striped >
            <thead >
               <tr key={Math.random()}>
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
                  return <tr key={usersList[key].uuid}>
                     <td><Link to={"/users/" + usersList[key].uuid} ><FaEye></FaEye> </Link></td>
                     <td>{usersList[key].firstName}</td>
                     <td>{usersList[key].lastName}</td>
                     <td>{usersList[key].email}</td>
                     <td>{Object.keys(usersList[key].roles).map((k, i) => usersList[key].roles[k].name === 'admin'
                        ? <FaUserNinja className='mx-2' style={{ color: 'red' }} />
                        : <FaUserCircle className='mx-2' style={{ color: 'blue' }} />)
                     }
                     </td>
                     <td>
                        <FaCheck
                           style={{ color: usersList[key].active ? "green" : "grey" }}
                           onMouseOver={({ target }) => (target as HTMLElement).style.color = "blue"}
                           onMouseOut={({ target }) => (target as HTMLElement).style.color = usersList[key].active ? "green" : "grey"}
                        >
                        </FaCheck></td>
                     <td>
                        <Link to={"/users/" + usersList[key].uuid + "/orders"}>
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
      </div>

      <CustomPagination perPage={perPage} currentPage={page} totalPages={totalPages} setPage={changePage}></CustomPagination>
   </UsersWrapper >
}
export default Users;
