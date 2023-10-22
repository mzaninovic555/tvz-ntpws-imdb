import AuthRedirect from '../../common/authentication/AuthRedirect.tsx';
import {Card} from 'primereact/card';
import FormInputText from '../../Components/FormInputText.tsx';
import {useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginApi, LoginResponse} from './LoginService.ts';
import {AxiosError} from 'axios';
import useAuth from '../../common/context/AuthContext.ts';
import {Messages} from 'primereact/messages';
import useToast from '../../common/context/ToastContext.ts';
import {createNewToast} from '../../common/messages/toastUtils.ts';


type LoginSubmitForm = {
  usernameOrEmail: string,
  password: string
}

const schema = yup.object().shape({
  usernameOrEmail: yup.string().required(),
  password: yup.string().required()
});

const Login = () => {
  const auth = useAuth();
  const {toast} = useToast();
  const {register, handleSubmit, formState: {errors}} =
      useForm<LoginSubmitForm>({
        resolver: yupResolver(schema)
      });

  const messages = useRef<Messages>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const submitForm = async (data: LoginSubmitForm) => {
    messages.current?.clear();
    setLoadingLogin(true);
    const response = await loginApi(data.usernameOrEmail, data.password)
      .catch(handleLoginFailure);
    setLoadingLogin(false);

    if (!response) {
      return;
    }

    if (response?.token) {
      auth.setToken(response.token);
      toast?.current?.show(createNewToast('Logged in successfully', 'success'));
    }
  };

  function handleLoginFailure(e: AxiosError<LoginResponse>) {
    const msg = e.response?.data.message;

    messages.current?.show({
      detail: msg ?? e.message,
      severity: 'error',
      sticky: true,
    });
  }

  const loginGoogle = () => {

  };

  const loginGithub = () => {

  };

  return (
    <AuthRedirect sendToHome={true}>
      <Card className='max-w-30rem m-auto mt-4' title='Login'>
        <Messages ref={messages} />
        <form className={'flex flex-column'} onSubmit={handleSubmit(submitForm)}>
          <FormInputText name='usernameOrEmail' type={'text'} placeholder={'username or e-mail'} label={'username or e-mail'}
            required register={register} errors={errors.usernameOrEmail} />
          <FormInputText name='password' type={'password'} placeholder={'password'} label={'password'}
            required register={register} />
          <div className='flex flex-column align-self-center align-items-center mt-2'>
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
