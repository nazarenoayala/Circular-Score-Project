import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext'
import { fetchData } from '../../../helpers/axiosHelper';

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [companyData, setCompanyData] = useState();
  const [test, setTest] = useState();

  useEffect(() => {

    const tokenLS = localStorage.getItem("credentials");

    if (tokenLS) {
      const fetchUserData = async () => {

        try {
          // Habrá que añadir token en la petición
          let result = await fetchData('/user/userByToken', 'GET', null, tokenLS);
          setToken(tokenLS);

          setUserData(result.data.userData);
          setCompanyData(result.data.companyData);
        } catch (error) {
          console.log(error);
        }

      }
      fetchUserData();
    }

    const fetchTest = async () => {

      try {
        // TODO: hay que añadirle el token a la petición
        let result = await fetchData('/test/allTest', 'GET', null, null);
        setTest(result.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTest();

  }, []);

  const logout = () => {
    setUserData();
    setCompanyData();
    localStorage.removeItem("token");
  }

  return (
    <>
      <AuthContext.Provider value={{
        userData,
        setUserData,
        companyData,
        setCompanyData,
        token,
        setToken,
        logout,
        test
      }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
