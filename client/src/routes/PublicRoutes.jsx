import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext/AuthContext"


export const PublicRoutes = () => {

  const {userData, companyData} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=> {
    if(userData){
      if(userData.type === 2){
        if(companyData.company_name !== null){
          navigate('/allTests');
        } else {
          navigate(`/companyRegister/${userData.user_id}`);
        }
      } else if (userData.type === 1){
        navigate('/tests');
      }
    } else {
      navigate('/');
    }
  }, [userData]);

  return (
    <div>
      <Outlet />
    </div>
  )
}
