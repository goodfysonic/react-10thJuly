import React from 'react';
import { useParams } from 'react-router-dom';
import NewUserForm from './NewUserForm'; 

const UserSavePage = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Create New User'}</h1>
      <NewUserForm />
    </div>
  );
};

export default UserSavePage;
