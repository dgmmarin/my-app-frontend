import React, { FC } from 'react';
import { OrderItemWrapper } from './OrderItem.styled';

interface OrderItemProps {}

const OrderItem: FC<OrderItemProps> = () => (
 <OrderItemWrapper data-testid="OrderItem">
    OrderItem Component
 </OrderItemWrapper>
);

export default OrderItem;
