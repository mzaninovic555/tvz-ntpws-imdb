import {useNavigate} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import {MenuItem, MenuItemCommandEvent} from 'primereact/menuitem';
import logo from '../assets/logo-navbar.png';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import useAuth from '../common/context/AuthContext.ts';
import './navbar.css';
import useToast from '../common/context/ToastContext.ts';
import {createNewToast} from '../common/messages/toastUtils.ts';
import {Dropdown} from 'primereact/dropdown';
import {useState} from 'react';
import ItemType from '../common/enums/ItemType.ts';

const Navbar = () => {
  const searchTypes = [ItemType.Movie, ItemType.Show];
  const [selectedType, setSelectedType] = useState(ItemType.Movie);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();
  const {toast} = useToast();

  const menuItems: MenuItem[] = [
    {
      label: 'Home',
      url: '/',
      command(event: MenuItemCommandEvent) {
        event.originalEvent?.preventDefault();
        navigate('/');
      }
    },
    {
      label: 'Movies',
      url: '/movies',
      command(event: MenuItemCommandEvent) {
        event.originalEvent?.preventDefault();
        navigate('/movies');
      }
    },
    {
      label: 'TV Shows',
      url: '/tv-shows',
      command(event: MenuItemCommandEvent) {
        event.originalEvent?.preventDefault();
        navigate('/tv-shows');
      }
    }
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
          label: 'Settings',
          icon: 'pi pi-cog',
          url: '/settings',
          command(event: MenuItemCommandEvent) {
            event.originalEvent?.preventDefault();
            navigate('/settings');
          }
        },
        {
          label: 'Watchlist',
          icon: 'pi pi-bookmark',
          url: '/watchlist',
          command(event: MenuItemCommandEvent) {
            event.originalEvent?.preventDefault();
            navigate('/watchlist');
          }
        },
        {
          label: 'Completed',
          icon: 'pi pi-check-square',
          url: '/completed',
          command(event: MenuItemCommandEvent) {
            event.originalEvent?.preventDefault();
            navigate('/completed');
          }
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: logOut
        }]
    }
  ];

  const searchForItemByType = () => {
    if (!selectedType || !searchTerm || searchTerm === '') {
      return;
    }
    const prefix = selectedType === ItemType.Movie ? '/movies' : 'tv-shows';
    navigate(prefix, {state: searchTerm});
  };

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
    <div className='flex align-items-center mx-2 pr-4 border-gray-300 flixverse-menubar-start cursor-pointer'
      onClick={() => navigate('/')}>
      <img alt='logo' src={logo} height={60} className='mr-3 my-0'></img>
      <h1>Flixverse</h1>
    </div>
  );

  const end = (
    <div className={'flex min-w-min w-10 ml-auto flixverse-menubar-end'}>
      <Dropdown value={selectedType} options={searchTypes}
        style={{borderRight: 'none', borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset'}}
        onChange={(e) => setSelectedType(e.value as ItemType)} />
      <InputText placeholder='Search' type='text' className='w-full'
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        style={{borderTopLeftRadius: 'unset', borderBottomLeftRadius: 'unset',
          borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset'}} />
      <Button severity='help' className='mr-2 px-4' icon='pi pi-search'
        style={{borderTopLeftRadius: 'unset', borderBottomLeftRadius: 'unset'}}
        onClick={searchForItemByType}/>
      {authDiv}
    </div>
  );

  return (
    <nav className={'border-noround-top mt-0'}>
      <div className='container-70'>
        <Menubar model={menuItems} start={start} end={end} className='border-none p-0' />
      </div>
    </nav>
  );
};

export default Navbar;
