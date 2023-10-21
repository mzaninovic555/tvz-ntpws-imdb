import {useNavigate} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem';
import logo from '../assets/logo-navbar.png';
import {useAuth} from '../provider/AuthWrapper.tsx';
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const menuItems: MenuItem[] = [
    {
      label: 'Placeholder 1',
      url: '/'
    },
    {
      label: 'Placeholder 2',
      url: '/'
    },
    {
      label: 'Placeholder 3',
      url: '/'
    },
    {
      label: 'Placeholder 1',
      url: '/'
    },
    {
      label: 'Placeholder 1',
      url: '/'
    }
  ];

  const logOut = () => {
    auth.setToken(null);
  };

  const userMenuItems: MenuItem[] = [
    {
      label: 'My page',
      icon: 'pi pi-user',
      url: '/'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: logOut
    }
  ];

  const authDiv = (
    <>
      {auth.isAuthenticated && <>
        <Menu model={userMenuItems} className={'p-0'} />
      </>}
      {!auth.isAuthenticated && location.pathname != '/login' && location.pathname != '/register' &&
        <>
          <Button label={'Sign in'} className='p-button-text p-0 mr-1 min-w-max' icon='pi pi-sign-in'
            onClick={() => navigate('login')} />
        </>
      }
    </>
  );

  const start = <img alt='logo' src={logo} height={40} className='mr-1 cursor-pointer'></img>;

  const end = (
    <div className={'flex'}>
      <InputText placeholder='Search' type='text' className='w-full ml-2 mr-2' />
      {authDiv}
    </div>
  );

  return (
    <nav className={'card border-noround-top mt-0'}>
      <Menubar model={menuItems} start={start} end={end} />
    </nav>
  );
};

export default Navbar;
