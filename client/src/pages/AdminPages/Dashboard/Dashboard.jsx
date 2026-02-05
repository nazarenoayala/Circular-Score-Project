import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import './dashboard.css'
import { MyButton } from '../../../components/MyButton/MyButton'

const Dashboard = () => {
  const navigate = useNavigate();

  const menu =[
    {title: "Control de Tests", route:"/tests", description:"Listado de tests: habilitar/deshabilitar/editar"},
    {title: "Crear nuevo Test", route:"/createTest", description:"Configurar test desde cero"},
    {title: "Empresas", route:"/allCompanies", description:"Listado de empresas: información, y opción de deshabilitar"},
    {title: "Categorías de empresas", route:"/adminManageSectors", description:"Listado de categorias: crear, modificar o eliminar"},
    {title: "Historial de Tests", route:"/adminTestsRecord", description:"Consultar tests realizados"},
    {title: "Gráficos y Estadísticas", route:"/graphic", description:"Gráficas de rendimiento de los tests"}

  ]

  const [search, setSearch] = useState("");
  const [filterMenu, setFilterMenu] = useState(menu);

  //Filtramos secciones
  const searchSection = (e) => {
    e.preventDefault();
    let newArray = menu.filter((elem) => {
      return (
        elem.title.toLowerCase().includes(search.toLowerCase()) ||
        elem.description.toLowerCase().includes(search.toLowerCase())
      )
    });
    setFilterMenu(newArray);
  }
  //Limpiamos busqueda
  const reset = () => {
    setSearch("");
    setFilterMenu(menu);
  }
  return (
    <Container className='AllDashboard'>
      <header className='dashboard-header'>
        <h1 className='section-title'>Panel de administración</h1>
        <div className='search'>
          <input className='input-search' 
              type="text" 
              placeholder='Buscar sección 🔍'
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
          />
          <div className='btn'>
          <MyButton
            text="Buscar"
            onSubmit={searchSection}
          />
          <MyButton
            text="Limpiar"
            onSubmit={reset}
          />
          </div>
        </div>
      </header>
      <div className='dashboard-grid'>
        {filterMenu.map((elem, idx) =>(
          <div
            key={idx}
            className='dashboard-card'
            onClick={() => navigate(elem.route)}
          >
            <div className='card-content'>
              <h3>{elem.title}</h3>
              <p>{elem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Dashboard