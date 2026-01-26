import './InfoOneCompany.css' 


export const InfoOneCompany = ({company}) => {

  return (

    <div className="company_information">
        <h3><span>Teléfono:</span> {company?.company.phone_number}</h3>
        <h3><span>Email:</span> {company?.company.email}</h3>
        <h3><span>Dirección:</span> {company?.company.city_id}, {company?.company.province_id}</h3>
        <h3><span>Sector:</span> {company?.company.sector_id}</h3>
        <h3><span>Años en Activo:</span> {company?.company.active_years}</h3>
        <h3><span>Nº Empleados:</span> {company?.company.company_size}</h3>
        <h3><span>Tipo Empresa:</span> {company?.company.company_type}</h3>
        <h3><span>Ámbito Geográfico:</span> {company?.company.gso}</h3>
        <h3><span>Tipos de Clientes:</span> {company?.company.client_segment}</h3>
        <h3><span>Sostenibilidad y ODS:</span> {company?.company.sustainability}</h3>
        <h3><span>Nivel de Experiencia con ODS:</span> {company?.company.ods_background}</h3>
    </div>
  )
}
 