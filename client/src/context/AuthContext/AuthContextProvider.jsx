import { useEffect , useState } from 'react';
import { AuthContext } from './AuthContext'
import { fetchData } from '../../../helpers/axiosHelper';

export const AuthContextProvider = ({children}) => {

  const [test, setTest] = useState();

  useEffect(() => {

    const fetchTest = async () => {

      try {

        // Habrá que añadir token en la petición
        let result = await fetchData('/test/allTest', 'GET');
        setTest(result.data.result);
        
      } catch (error) {
        console.log(error);
      }

    }

    fetchTest();

  }, [])

  return (
    <>
      <AuthContext.Provider value={{test}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
