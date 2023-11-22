import React, { FC } from 'react';
import { OrderShowWrapper } from './OrderShow.styled';
import { useParams } from 'react-router-dom';
import { ListGroup, Badge } from 'react-bootstrap';
import { useListOrderSingleQuery } from '../../redux/slices/userApiSlice';
interface OrderShowProps { }

const OrderShow: FC<OrderShowProps> = () => {
   const { orderId } = useParams();
   const { data: order, isLoading, isSuccess, isError, error } = useListOrderSingleQuery({ orderId: orderId });

   if (isLoading) {
      return <OrderShowWrapper data-testid="OrderShow">
         Loading...
      </OrderShowWrapper>
   }

   if (isError) {
      return <OrderShowWrapper data-testid="OrderShow">
         Error on loading order {orderId}
      </OrderShowWrapper>
   }

   return <OrderShowWrapper data-testid="OrderShow">
      OrderShow Component {orderId}
      <ListGroup as="ol" numbered>
         <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
         >
            <div className="ms-2 me-auto">
               <div className="fw-bold">Order {orderId}</div>
            </div>
         </ListGroup.Item>

      </ListGroup>
   </OrderShowWrapper>
}

export default OrderShow;
