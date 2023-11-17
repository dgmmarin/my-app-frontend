import React, { FC } from 'react';
import { RolesWrapper } from './Roles.styled';

interface RolesProps {}

const Roles: FC<RolesProps> = () => (
 <RolesWrapper data-testid="Roles">
    Roles Component
 </RolesWrapper>
);

export default Roles;
