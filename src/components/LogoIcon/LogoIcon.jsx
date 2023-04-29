import './LogoIcon.css';
import LogoIconImage from '../../assets/logoIcon.png';
import LogoText from '../../assets/logoText.png';

function LogoIcon() {
  return (
    <div className='logo'>
      <img src={LogoIconImage} alt="Logo Amigos Peludos" className="logo-icon img-fluid"/>
      <img src={LogoText} alt="Texto Amigos Peludos" className="logo-text img-fluid"/>
    </div>
  );
}

export default LogoIcon;
