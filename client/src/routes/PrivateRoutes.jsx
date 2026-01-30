import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export const PrivateRoutes = ({userData, requiredType}) => {

  const navigate = useNavigate();
  
  useEffect(()=> {
    if(userData?.type !== requiredType) navigate("/");
  },[userData]);

  return (
    <>
      <Outlet />
    </>
  );
};