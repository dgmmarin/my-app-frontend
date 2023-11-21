import React, { FC, useCallback, useEffect, useState } from 'react';
import { OrdersWrapper } from './Orders.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useListOrdersMutation } from '../../redux/slices/userApiSlice';
import { useParams } from 'react-router-dom';
// import { setOrders } from '../../redux/slices/ordersSlice';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';
import { fetchAllOrders } from '../../redux/slices/ordersSlice';
import { AppDispatch } from '../../redux/store';

interface OrdersProps { }

const Orders: FC<OrdersProps> = () => {
   const { userId } = useParams();
   const dispatch: AppDispatch = useDispatch();
   const { orders } = useSelector((state: any) => state.orders);
   const [currentPage, setCurrentPage] = useState(0);
   const { page } = useSelector((state: any) => state.orders);
   const { loading } = useSelector((state: any) => state.orders);
   const [listOrders, { isLoading, error }] = useListOrdersMutation();

   const fetchOrders = useCallback(async () => {
      try {
         if (loading === 'idle' && orders.length === 0) {
            console.log("fetching orders", userId);
            await dispatch(fetchAllOrders(userId ?? undefined));
            setTimeout(async () => {
               return await Promise.resolve();
            }, 5000);
         }
      } catch (error) {
         console.log(error);
         toast.error('Error fetching orders');
      }
   }, [dispatch, userId, loading, orders]);

   useEffect(() => {
      console.log(loading)
      if (orders.length === 0 && !_.isEqual(currentPage, page) && !error && loading === 'idle') {
         fetchOrders()
      }
   }, [fetchOrders, orders, currentPage, page, error, loading]);

   return <OrdersWrapper data-testid="Orders">
      <Table responsive>
         <thead>
            <tr>
               <th>#</th>
               <th>Order ID</th>
               <th>Status</th>
               <th>Type</th>
               <th>Created At</th>
            </tr>
         </thead>
         <tbody>
            {orders && Object.keys(orders).map((k, i) => {
               return <tr key={i}>
                  <td>{orders[k].id}</td>
                  <td>{orders[k].uuid}</td>
                  <td>{orders[k].status}</td>
                  <td>{orders[k].type}</td>
                  <td>{orders[k].createdAt}</td>
               </tr>
            })}
         </tbody>
      </Table>
   </OrdersWrapper>
};

export default Orders;
