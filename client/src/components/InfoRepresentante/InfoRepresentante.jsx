import './InfoRepresentante.css'
import { question3 } from '../../data/CompanyRegisterData/Question3'

export const InfoRepresentante = ({company}) => {

  //mapeo del archivo question3.js
 const position = Object.fromEntries(question3.map(e => [e.id, e.name]));

  return (
    <div className='contact_info'>
      <h3><span>Persona de Contacto:</span> {company?.company.name}</h3>
      <h3><span>Ocupación:</span> {position[company?.company.position]}</h3>
      <h3><span>Teléfono:</span> {company?.company.phone_number}</h3>
      <h3><span>Email:</span> {company?.company.user_email}</h3>      
    </div>
  )
}
