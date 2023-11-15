import React, { FC } from 'react';
import { ProfileWrapper } from './Profile.styled';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => (
 <ProfileWrapper data-testid="Profile">
    Profile Component
 </ProfileWrapper>
);

export default Profile;
