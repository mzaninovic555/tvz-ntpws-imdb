import {useNavigate} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem';
import logo from '../assets/logo-navbar.png';
import {useAuth} from '../provider/AuthWrapper.tsx';
import {Menu} from 'primereact/menu';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const menuItems: MenuItem[] = [
  ];

  const start = (
    <div className={'cursor-pointer'} onClick={() => navigate('/')}>
      <img alt='logo' src={logo} height={60} className={'mr-2 mt-0 mb-0 cursor-pointer'}></img>
    </div>
  );

  const end = (
    <div>
      {auth.token && <>
        <Menu
      </>}
    </div>
  );

  return (
    <nav className={'card'}>
      <Menubar model={menuItems} start={start} />
    </nav>
  );
};

export default Navbar;
