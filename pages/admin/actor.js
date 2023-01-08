import React from 'react';
import { api_getActors } from '../../components/common/apiOperation';
import AdminActor from '../../components/Component/Admin/AdminActor';

export default function actor() {
  return (
    <div>
      <AdminActor />
    </div>
  );
}
