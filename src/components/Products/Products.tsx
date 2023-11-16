import React, { FC } from 'react';
import { ProductsWrapper } from './Products.styled';

interface ProductsProps {}

const Products: FC<ProductsProps> = () => (
 <ProductsWrapper data-testid="Products">
    Products Component
 </ProductsWrapper>
);

export default Products;
