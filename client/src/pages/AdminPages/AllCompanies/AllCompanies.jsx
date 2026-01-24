import { useEffect, useState } from 'react';
import { CompaniesCard } from '../../../components/CompaniesCard/CompaniesCard'
import { fetchData } from '../../../../helpers/axiosHelper';

const AllCompanies = () => {

  const [nombreEmpresa, setNombreEmpresa] = useState([]);

//   useEffect(() => {

//     const fetchNombreEmpresa = async () => {

//       try {
//         const res = await fetchData(
//           '/company',
//           'GET',
//           nombreEmpresa,
//           null
//         );
//          console.log(res);
//        // setNombreEmpresa(res.data);
       
        
//       } catch(error) {
// console.log(error);

//       }
//     };
//     fetchNombreEmpresa();
//   }, []);





  return (
    <div>
      {nombreEmpresa.map((empresa) => {
        return <CompaniesCard key={nombreEmpresa.user_id} empresa={empresa} />;
      })}
    </div>
  );
};
export default AllCompanies;
