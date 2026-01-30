import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export const PrivateRoutes = ({userData, requiredType}) => {

  const navigate = useNavigate();
  console.log("USERTYPE Y USER DATA EN PRIVATE ROUTES", userData, requiredType);
  console.log(requiredType);
  
  useEffect(()=> {
    if(userData?.type !== requiredType) navigate("/");
  },[userData]);

  return (
    <>
      <Outlet />
    </>
  );
};

