import React from 'react';
import { useParams } from 'react-router-dom';
import NewUserForm from './NewUserForm';

const UserSavePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id ? '' : ''}</h1>
      <NewUserForm userId={id} />
    </div>
  );
};

export default UserSavePage;
