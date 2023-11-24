import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { OrdersWrapper } from './Orders.styled';
import { useListOrdersQQuery } from '../../redux/slices/userApiSlice';
import { Link, useParams } from 'react-router-dom';
import * as _ from 'lodash';
import { Spinner, Table } from 'react-bootstrap';

import CustomPagination from '../Pagination/Pagination';
import { FaEye, FaUserNinja } from 'react-icons/fa';

interface OrdersProps { }

const Orders: FC<OrdersProps> = () => {
   const { userId, } = useParams();
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);
   const [totalPages, setTotalPages] = useState(0);
   const [ordersList, setOrdersList] = useState({} as any);
   const { data: orders, isLoading, isSuccess, isError, error, refetch } = useListOrdersQQuery({ page: page, perPage: perPage, userId: userId });
   const interval = useRef<NodeJS.Timer | null>(null);

   const changePage = (event: any, page: number) => {
      setPage(page);
   }

   useEffect(() => {
      if (orders && orders.data) {
         setOrdersList(orders.data)
         setPage(orders.meta.page);
         setPerPage(orders.meta.limit);
         setTotalPages(orders.meta.pages);
      }

      interval.current = setInterval(async () => {
         if (!isLoading && !_.isEqual(orders, ordersList) && !error) {
            refetch()
         }
      }, 10000);
      return () => {
         if (interval.current) {
            clearInterval(interval.current);
         }
      };

   }, [orders, setOrdersList, setPage, setPerPage, setTotalPages, ordersList, isLoading, error, refetch]);

   return <OrdersWrapper data-testid="Orders">
      {isLoading ? <Spinner /> :
         (orders && orders.data.length > 0 ? <Table responsive bordered hover striped>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Created At</th>
               </tr>
            </thead>
            <tbody>
               {ordersList && Object.keys(ordersList).map((k, i) => {
                  return <tr key={i}>
                     <td><Link to={"/orders/" + ordersList[k].uuid} ><FaEye></FaEye> </Link></td>
                     <td>{ordersList[k].status}</td>
                     <td>{ordersList[k].description}</td>
                     <td>{ordersList[k].type}</td>
                     <td>
                        <Link to={"/users/" + ordersList[k].user?.uuid} >
                           <FaUserNinja
                              className='mx-2' ></FaUserNinja>
                        </Link>
                     </td>
                     <td>{ordersList[k].createdAt}</td>
                  </tr>
               })}
            </tbody>
         </Table> : <div>No orders found</div>)
      }
      {ordersList && ordersList.length > 0 ? <CustomPagination perPage={perPage} currentPage={page} totalPages={totalPages} setPage={changePage} /> : null}

   </OrdersWrapper >
};

export default Orders;
