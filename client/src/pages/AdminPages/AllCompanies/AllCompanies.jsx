import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import { CompaniesCard } from '../../../components/CompaniesCard/CompaniesCard';
import { MyButton } from '../../../components/MyButton/MyButton';
import './AllCompanies.css';

const AllCompanies = () => {
  const { token, userData } = useContext(AuthContext);

  //  estado que guarda la lista de empresas
  const [allCompanies, setAllCompanies] = useState([]);

  //estado que guarda el id de la empresa abierta
  const [showInfo, setShowInfo] = useState(null);

  //estado que guarda las empresas filtradas
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  //estado para controlar el input
  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        let res = await fetchData('/company/allCompanies', 'GET', null, token);
        console.log(res);
        setAllCompanies(res.data.companyResult);
        setFilteredCompanies(res.data.companyResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, [token]);


  //funcion que filtra las empresas
  const searchCompany = (e) => {
    e.preventDefault();
    let newArray = allCompanies.filter((elem) => {
      // filtramos por nombre de empresa (en minúsculas)
      const sameName = elem.company_name.toLowerCase().includes(search.toLowerCase());

      // filtramos por categoría (si hay una seleccionada)
      const sameCategory = selectedCategory === '' ||
        selectedCategory === 'Todas las categorías' ||
        String(elem.sector_id) === selectedCategory;
      return sameName && sameCategory;
    });
    setFilteredCompanies(newArray);
  };

  const reset = () => {
    setSearch("")
    setSelectedCategory("")
  }



  return (
    <div className="AllCompanies">
      <h2 className="ACtitle pt-3">EMPRESAS REGISTRADAS</h2>

      <div className="search">
        <form onSubmit={searchCompany}>
          <input
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder=" Buscar empresa 🔍"
            className="input"
          />
        </form>

        <div className='selectCont'>
          <select
            className="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=""> Todas las categorías</option>
            <option value="1">Agricultura, ganadería y pesca</option>
            <option value="2">Industria alimentaria</option>
            <option value="3">Industria manufacturera</option>
            <option value="4">Construcción</option>
            <option value="5">Comercio mayorista</option>
            <option value="6">Comercio minorista</option>
            <option value="7">Servicios profesionales</option>
            <option value="8">Servicios financieros y seguros</option>
            <option value="9">Tecnología / Innovación / TIC</option>
            <option value="10">Energía y utilities</option>
            <option value="11">Medio ambiente y gestión de residuos</option>
            <option value="12">Turismo y hostelería</option>
            <option value="13">Transporte y logística</option>
            <option value="14">Educación y formación</option>
            <option value="15">Sanidad y servicios sociales</option>
            <option value="16">Cultura, deporte y ocio</option>
            <option value="17">Economía social</option>
            <option value="18">Otro sector (especificar)</option>
          </select>

          <div className='d-flex gap-2'>
            <MyButton text="Buscar" btnClass="btn-white" onSubmit={searchCompany} />
            <MyButton text="Limpiar" btnClass="btn-white" onSubmit={reset} /></div>
        </div>
      </div>

      <div className="mt-4">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((elem) => (

            <CompaniesCard
              key={elem.user_id}
              allCompanies={elem}
              userData={userData}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              token={token}
            />
          ))
        ) : (

          <div className=" no-results text-center p-5">
            <h4 className="text-muted">
              No hay ninguna empresa registrada en la categoría seleccionada o que coincida con tu búsqueda.
            </h4>
            <p>Intenta cambiar los filtros o el texto de búsqueda.</p>
          </div>
        )}
      </div>

    </div>
  );
};
export default AllCompanies;
