import { MyButton } from '../../../components/MyButton/MyButton';
import './profile.css';

const CompanyProfilePage = () => {


  return (
    <div className='profileContainer'>
      <div className="profile">
        <div className='data'>
          <h3 className='pb-3'>Nombre de la empresa</h3>
          <p>Sector</p>
          <p>Persona de contacto</p>
          <p>Email</p>
          <p>Teléfono</p>
        </div>
        <div className="ranking">
          <div>
            <h4>Ranking</h4>
            <p className='position'>15</p>
          </div>
          <MyButton
            btnClass={'btn-green'}
            text={"Editar"}
          />
        </div>
      </div>

      <div className="tests">
        <h2 className='py-4'>Tests realizados</h2>
        <div className="testscont">
          <div className='testdata'>
            <img src="/src/assets/react.svg" alt="" />
            <div className="name">
              <p>ODS</p>
              <p>Nombre del test</p>
            </div>
          </div>
          <div className="button">
            <MyButton
              text={'Detalles'}
              btnClass={'btn-white'}
            />
          </div>
          <div className="progressbar">
            <p>barrita</p>
            <p>100%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfilePage;