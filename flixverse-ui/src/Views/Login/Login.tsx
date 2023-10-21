import AuthRedirect from '../../common/authentication/AuthRedirect.tsx';
import {Card} from 'primereact/card';
import FormInputText from '../../Components/FormInputText.tsx';
import {FormEvent, useState} from 'react';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loginGoogle = () => {

  };

  const loginGithub = () => {

  };

  return (
    <AuthRedirect sendToHome={true}>
      <Card className='max-w-30rem m-auto mt-4' title='Login'>
        <form className={'flex flex-column'} onSubmit={handleSubmit}>
          <FormInputText name={'username'} type={'text'} placeholder={'Username'} label={'Username'}
            errorMessage='Username should be between 3 and 16 characters with no special characters'
            onChange={setUsername}/>
          <FormInputText name={'password'} type={'password'} placeholder={'Password'} label={'Password'}
            errorMessage='Password should be at least 8 characters'
            onChange={setPassword}/>
          <div className='flex flex-column align-self-center align-items-center'>
            <Button icon="pi pi-check" type='submit' label='Login' loading={loadingLogin} className='mb-2 w-12rem' />
            <Button icon="pi pi-google" label="Google" type="button" onClick={loginGoogle} className='mb-2 w-12rem text-color border-200'
              style={{background: 'rgba(255,255,255,0.79)'}}/>
            <Button icon="pi pi-github" label="Github" type="button" onClick={loginGithub} className='w-12rem mb-3'
              style={{background: '#23282c', borderColor: '#24292d'}}/>
            <Link to='/register' className='auth-link'>Register here</Link>
          </div>
        </form>
      </Card>
    </AuthRedirect>);
};

export default Login;
