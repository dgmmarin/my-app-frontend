import React, { FC } from 'react';
import { PermissionWrapper } from './Permission.styled';

interface PermissionProps {}

const Permission: FC<PermissionProps> = () => (
 <PermissionWrapper data-testid="Permission">
    Permission Component
 </PermissionWrapper>
);

export default Permission;
