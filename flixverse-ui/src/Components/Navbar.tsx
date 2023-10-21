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
        <Menu model={userMenuItems} />
      </>}
      {!auth.isAuthenticated && location.pathname != '/login' && location.pathname != '/register' &&
        <>
          <Button label={'Sign in'} className='p-button-text' icon='pi pi-sign-in'
            onClick={() => navigate('login')} />
        </>
      }
    </>
  );

  const start = (
    <div className='mr-2 cursor-pointer' onClick={() => navigate('/')}>
      <img alt='logo' src={logo} height={60}></img>
    </div>
  );

  const end = (
    <div className={'flex justify-content-center'}>
      <InputText placeholder='Search' type='text' className='w-full' />
      {authDiv}
    </div>
  );

  return (
    <nav className={'card'}>
      <Menubar model={menuItems} start={start} end={end}/>
    </nav>
  );
};

export default Navbar;
