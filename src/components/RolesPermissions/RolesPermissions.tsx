import React, { FC } from 'react';
import { RolesPermissionsWrapper } from './RolesPermissions.styled';

interface RolesPermissionsProps {}

const RolesPermissions: FC<RolesPermissionsProps> = () => (
 <RolesPermissionsWrapper data-testid="RolesPermissions">
    RolesPermissions Component
 </RolesPermissionsWrapper>
);

export default RolesPermissions;
