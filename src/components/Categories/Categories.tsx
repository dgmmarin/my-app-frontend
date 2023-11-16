import React, { FC } from 'react';
import { CategoriesWrapper } from './Categories.styled';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => (
 <CategoriesWrapper data-testid="Categories">
    Categories Component
 </CategoriesWrapper>
);

export default Categories;
