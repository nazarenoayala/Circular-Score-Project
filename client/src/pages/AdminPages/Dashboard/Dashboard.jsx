import React from 'react'

const Dashboard = () => {

  const menu =[
    {title: "Control de Tests", path:"/tests", description:"Listado de tests: habilitar/deshabilitar/editar"},
    {title: "Crear nuevo Test", path:"/createTest", description:"Configurar nuevo test desde cero"},
    {title: "Empresas", path:"/allCompanies", description:"Listado de empresas: información, y opción de deshabilitar"},
    {title: "Historial de Tests", path:"/adminTestsRecord", description:"Consultar tests realizados"},
    {title: "Gráficos y Estadísticas", path:"/graphic", description:"Gráficas de rendimiento de los tests"}

  ]
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard