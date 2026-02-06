import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export const PrivateRoutes = ({userData, requiredType}) => {

  const navigate = useNavigate();

  useEffect(()=> {
    const isThereToken = localStorage.getItem("credentials");
    if(!isThereToken){
      if(userData?.type !== requiredType) navigate("/");
    }
  },[userData]);

  return (
    <>
      <Outlet />
    </>
  );
};