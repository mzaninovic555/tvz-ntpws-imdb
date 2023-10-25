import {useNavigate} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem';
import logo from '../assets/logo-navbar.png';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import useAuth from '../common/context/AuthContext.ts';
import './navbar.css';
import useToast from '../common/context/ToastContext.ts';
import {createNewToast} from '../common/messages/toastUtils.ts';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const {toast} = useToast();

  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Movies',
      url: '/movies'
    },
    {
      label: 'TV Shows',
      url: '/tv-shows'
    },
    {
      label: 'Actors',
      url: '/actors'
    },
  ];

  const logOut = () => {
    auth.setToken(undefined);
    toast?.current?.show(createNewToast('Logged out successfully', 'success'));
  };

  const userMenuItems: MenuItem[] = [
    {
      label: auth.authInfo.info?.name ?? 'User',
      icon: 'pi pi-user',
      items: [
        {
          label: 'My page',
          icon: 'pi pi-user',
          url: '/'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: logOut
        }]
    }
  ];

  const authDiv = (
    <>
      {auth.authInfo.authenticated && <>
        <Menubar model={userMenuItems} className={'p-0'} />
      </>}
      {!auth.authInfo.authenticated && location.pathname != '/login' && location.pathname != '/register' &&
        <>
          <Button label={'Sign in'} className='p-button-text p-2 ml-2 mr-2 min-w-max' icon='pi pi-sign-in'
            onClick={() => navigate('login')} />
        </>
      }
    </>
  );

  const start = (
    // TODO: add navigate to home
    <div className='flex align-items-center mx-2 pr-4 border-gray-300 flixverse-menubar-start cursor-pointer'
      onClick={() => navigate('/')}>
      <img alt='logo' src={logo} height={60} className='mr-3 my-0'></img>
      <h1>Flixverse</h1>
    </div>
  );

  const end = (
    <div className={'flex min-w-min flixverse-menubar-end'}>
      <InputText placeholder='Search' type='text' className='w-full ml-2 mr-2' />
      {authDiv}
    </div>
  );

  return (
    <nav className={'border-noround-top mt-0'}>
      <div className='container'>
        <Menubar model={menuItems} start={start} end={end} className='border-none p-0' />
      </div>
    </nav>
  );
};

export default Navbar;
