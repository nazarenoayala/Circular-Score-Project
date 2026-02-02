import { useEffect } from "react"
import { useNavigate } from 'react-router'
import { useParams } from "react-router";
import { fetchData } from "../../../../helpers/axiosHelper";

const ActivateUser = ({setShowPage}) => {

  const navigate = useNavigate();
  const {token, user_id} = useParams();



  useEffect(()=> {
    //Si llaman a esta url desde el link con token
    if(token && user_id){
      const fetchActivationData = async () => {
      try {
          const activateResult = await fetchData(`/user/activateUser/${token}/${user_id}`, 'PUT', null);
          console.log('resultado de la acivación de la cuenta', activateResult);
          setShowPage('login');
        } catch (error) {
          console.log(error);
        }
      }
      fetchActivationData();
      navigate('/');
    } else {
        navigate('/');
        console.log('Link incorrecto o no autorizado.');
    }
  }, [token, user_id]);

}

export default ActivateUser