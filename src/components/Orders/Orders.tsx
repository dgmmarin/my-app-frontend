import React, { FC, useEffect, useState } from 'react';
import { OrdersWrapper } from './Orders.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useListOrdersMutation } from '../../redux/slices/userApiSlice';
import { useParams } from 'react-router-dom';
import { setOrders } from '../../redux/slices/ordersSlice';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

interface OrdersProps { }

const Orders: FC<OrdersProps> = () => {
   const { userId } = useParams();
   const dispatch = useDispatch();
   const { orders } = useSelector((state: any) => state.orders);
   const [ordersList, setOrdersList] = useState({} as any);
   const [listOrders, { isLoading, error }] = useListOrdersMutation();

   const fetchOrders = async () => {
      console.log("fetching orders", userId);
      try {
         const res = await listOrders(userId ?? undefined).unwrap();
         console.log(res);
         setOrdersList({ ...res });
         dispatch(setOrders({ ...res }));
      } catch (error) {
         console.log(error);
         toast.error('Error fetching orders');
      }
   };

   useEffect(() => {
      if (!isLoading && !_.isEqual(orders, ordersList) && !error) {
         fetchOrders().then((orders) => console.log("fetched orders"));
      }
   });

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
            {ordersList && Object.keys(ordersList).map((k, i) => {
               return <tr key={i}>
                  <td>{ordersList[k].id}</td>
                  <td>{ordersList[k].uuid}</td>
                  <td>{ordersList[k].status}</td>
                  <td>{ordersList[k].type}</td>
                  <td>{ordersList[k].createdAt}</td>
               </tr>
            })}
         </tbody>
      </Table>
   </OrdersWrapper>
};

export default Orders;
