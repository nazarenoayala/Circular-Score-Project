import { MyButton } from '../MyButton/MyButton';
import './FooterPublic.css';

export const FooterPublic = () => {

  return (
    <div className='footer-public'>
      <div>
        <img src="/src/assets/Images/logo/logoblanco.png" />
      </div>

      <div>
        <MyButton
          text={"Volver arriba"}
          onSubmit={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
          btnClass='btn-white'
        />
      </div>

      <div>
        <div className='child2'>
          <p>Privacidad</p>
          <p>Cookies</p>
          <p>Aviso legal</p>
        </div>

        <div className="logos">
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  )
}
