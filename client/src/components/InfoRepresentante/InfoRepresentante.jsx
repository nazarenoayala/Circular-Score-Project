import './InfoRepresentante.css'

export const InfoRepresentante = ({company}) => {

 
  return (
    <div className='contact_info'>
      <h3><span>Persona de Contacto:</span> {company?.company.name}</h3>
      <h3><span>Ocupación:</span> {company?.company.position}</h3>
      <h3><span>Teléfono:</span> {company?.company.phone_number}</h3>
      <h3><span>Email:</span> {company?.company.user_email}</h3>      
    </div>
  )
}
