import React, { FC } from 'react';
import { OrdersWrapper } from './Orders.styled';

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => (
 <OrdersWrapper data-testid="Orders">
    Orders Component
 </OrdersWrapper>
);

export default Orders;
