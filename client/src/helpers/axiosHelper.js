import axios from 'axios';
export const fetchData = async (url, method, data = null, token = null) => {
  
  let headers = {};

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  //configuracion para hacer la peticion
  const config = {
    url,
    method,
    data,
    headers,
  };

  const res = await axios(config);
  return res;
};
