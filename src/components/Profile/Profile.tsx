import React, { FC } from 'react';
import { ProfileWrapper } from './Profile.styled';
import { useParams } from 'react-router-dom';

interface ProfileProps {
   userId?: string;
}

const Profile: FC<ProfileProps> = (props: ProfileProps) => {
   const { userId } = useParams();
   return <ProfileWrapper data-testid="Profile">
      Profile Component {userId}
   </ProfileWrapper>
}

export default Profile;
