import {useRef, useState} from 'react';
import AuthRedirect from '../../common/authentication/AuthRedirect.tsx';
import {Card} from 'primereact/card';
import FormInputText from '../../Components/FormInputText.tsx';
import {Button} from 'primereact/button';
import {Link, useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerApi, RegisterResponse} from './RegisterService.ts';
import {AxiosError} from 'axios';
import {Messages} from 'primereact/messages';

type RegisterSubmitForm = {
  username: string,
  email: string,
  password: string,
  confirmPassword?: string
};

const schema = yup.object().shape({
  username: yup.string().min(3).max(16).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

const Register = () => {
  const messages = useRef<Messages>(null);
  const {register, handleSubmit, formState: {errors}} =
      useForm<RegisterSubmitForm>({
        resolver: yupResolver(schema)
      });
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const submitForm = (data: RegisterSubmitForm) => {
    setLoadingLogin(true);
    const response = registerApi(data.username, data.password, data.email)
      .catch(handleRequestFailure);
    setLoadingLogin(false);

    if (!response) {
      return;
    }

    navigate('/login?success');
  };

  function handleRequestFailure(e: AxiosError<RegisterResponse>) {
    const msg = e.response?.data?.message;

    messages.current?.show({
      detail: msg ?? e.message,
      severity: 'error',
      sticky: true,
    });
  }

  const loginGoogle = () => {
    // TODO kad sanity bude
  };

  const loginGithub = () => {
    // TODO kad sanity bude
  };

  return (
    <AuthRedirect sendToHome={true}>
      <Card className='max-w-30rem m-auto mt-4' title='Register'>
        <Messages ref={messages} />
        <form className={'flex flex-column'} onSubmit={handleSubmit(submitForm)}>
          <FormInputText name='username' type={'text'} placeholder={'username'} label={'username'}
            required register={register} errors={errors.username} />
          <FormInputText name='email' type={'email'} placeholder={'e-mail'} label={'e-mail'}
            required register={register} errors={errors.email} />
          <FormInputText name='password' type={'password'} placeholder={'password'} label={'password'}
            required register={register} errors={errors.password} />
          <FormInputText name='confirmPassword' type={'password'} placeholder={'confirm password'} label={'confirm password'}
            required register={register} errors={errors.confirmPassword} />
          <div className='flex flex-column align-self-center align-items-center mt-2'>
            <Button icon="pi pi-check" type='submit' label='Register' loading={loadingLogin} className='mb-2 w-12rem' />
            <Button icon="pi pi-google" label="Google" type="button" onClick={loginGoogle} className='mb-2 w-12rem text-color border-200'
              style={{background: 'rgba(255,255,255,0.79)'}}/>
            <Button icon="pi pi-github" label="Github" type="button" onClick={loginGithub} className='w-12rem mb-3'
              style={{background: '#23282c', borderColor: '#24292d'}}/>
            <Link to='/login' className='auth-link'>Have an account? Log in here</Link>
          </div>
        </form>
      </Card>
    </AuthRedirect>);
};

export default Register;
