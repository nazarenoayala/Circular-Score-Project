import './InfoOneCompany.css' 
import { question6 } from '../../data/CompanyRegisterData/Question6'
import { question7 } from '../../data/CompanyRegisterData/Question7';
import { question8 } from '../../data/CompanyRegisterData/Question8';
import { question9 } from '../../data/CompanyRegisterData/Question9';
import { question10 } from '../../data/CompanyRegisterData/Question10';
import { question13 } from '../../data/CompanyRegisterData/Question13';
import { question14 } from '../../data/CompanyRegisterData/Question14';
import { question15 } from '../../data/CompanyRegisterData/Question15';
import { question16 } from '../../data/CompanyRegisterData/Question16';
import { question17 } from '../../data/CompanyRegisterData/Question17';


export const InfoOneCompany = ({company}) => {

  const companyType = Object.fromEntries(question6.map(e => [e.id, e.name]));
  const legalForm = Object.fromEntries(question7.map(e => [e.id, e.name]));
  const activeYears = Object.fromEntries(question8.map(e => [e.id, e.name]));
  const companySize = Object.fromEntries(question9.map(e => [e.id, e.name]));
  const sector = Object.fromEntries(question10.map(e => [e.id, e.name]));
  const gso = Object.fromEntries(question13.map(e => [e.id, e.name]));
  const clientSegment = Object.fromEntries(question14.map(e => [e.id, e.name]));
  const stakeHolders = Object.fromEntries(question15.map(e => [e.id, e.name]));
  const sustOds = Object.fromEntries(question16.map(e => [e.id, e.name]));
  const odsBackground = Object.fromEntries(question17.map(e => [e.id, e.name]));
  

  return (

    <div className="company_information">
        <h3><span>Teléfono:</span> {company?.company.phone_number}</h3>
        <h3><span>Email:</span> {company?.company.company_email}</h3>
        <h3><span>Dirección:</span> {company?.company.city_name}, {company?.company.province_name}</h3>
        <h3><span>Sector:</span> {sector[company?.company.sector_id]}</h3>
        <h3><span>Años en Activo:</span> {activeYears[company?.company.active_years]}</h3>
        <h3><span>Nº Empleados:</span> {companySize[company?.company.company_size]}</h3>
        <h3><span>Tipo Empresa:</span> {companyType[company?.company.company_type]}</h3>
        <h3><span>Ámbito Geográfico:</span> {gso[company?.company.gso]}</h3>
        <h3><span>Tipos de Clientes:</span> {clientSegment[company?.company.client_segment]}</h3>
        <h3><span>Grupos de Interés:</span> {stakeHolders[company?.company.stakeholders]}</h3>
        <h3><span>Forma Jurídica: </span> {legalForm[company?.company.legal_form]}</h3>
        <h3><span>Sostenibilidad y ODS:</span> {sustOds[company?.company.sustainability]}</h3>
        <h3><span>Nivel de Experiencia con ODS:</span> {odsBackground[company?.company.ods_background]}</h3>
    </div>
  )
}
 
