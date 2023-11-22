import { FC, useEffect, useRef, useState } from 'react';
import { UsersWrapper } from './Users.styled';
import { useListUsersQQuery } from '../../redux/slices/userApiSlice';
import { Spinner, Table } from 'react-bootstrap';
import * as _ from 'lodash';
import { FaCheck, FaEye, FaFile, FaUserCircle, FaUserNinja } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomPagination from '../Pagination/Pagination';


interface UsersProps { }

const Users: FC<UsersProps> = () => {
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);
   const [totalPages, setTotalPages] = useState(0);
   const [usersList, setUsersList] = useState({} as any);
   const { data: users, isLoading, isSuccess, isError, error, refetch } = useListUsersQQuery({ page: page, perPage: perPage });
   const interval = useRef<NodeJS.Timer | null>(null);

   const changePage = (event: any, page: number) => {
      setPage(page);
   }

   useEffect(() => {
      if (users && users.data) {
         setUsersList(users.data)
         setPage(users.meta.page);
         setPerPage(users.meta.limit);
         setTotalPages(users.meta.pages);
      }

      interval.current = setInterval(async () => {
         if (!isLoading && !_.isEqual(users, usersList) && !error) {
            refetch();
         }
      }, 10000);

      return () => {
         if (interval.current) {
            clearInterval(interval.current);
         }
      };
   }, [users, setUsersList, setPage, setPerPage, setTotalPages, usersList, isLoading, error, refetch]);

   return <UsersWrapper data-testid="Users">
      {isLoading ? <Spinner /> : <div>
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
               {usersList && usersList && Object.keys(usersList).map((key, index) => {
                  return <tr key={usersList[key].uuid}>
                     <td><Link to={"/users/" + usersList[key].uuid} ><FaEye></FaEye> </Link></td>
                     <td>{usersList[key].firstName}</td>
                     <td>{usersList[key].lastName}</td>
                     <td>{usersList[key].email}</td>
                     <td>{Object.keys(usersList[key].roles).map((k, i) => usersList[key].roles[k].name === 'admin'
                        ? <FaUserNinja key={usersList[key].uuid + "_" + usersList[key].roles[k].name} className='mx-2' style={{ color: 'red' }} />
                        : <FaUserCircle key={usersList[key].uuid + "_" + usersList[key].roles[k]} className='mx-2' style={{ color: 'blue' }} />)
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
      </div>}

      <CustomPagination perPage={perPage} currentPage={page} totalPages={totalPages} setPage={changePage}></CustomPagination>
   </UsersWrapper >
}
export default Users;

