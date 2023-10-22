import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutesConfig from './routes/RoutesConfig.tsx';
import AuthWrapper from './common/authentication/AuthWrapper.tsx';
import Navbar from './Components/Navbar.tsx';
import ToastWrapper from './Components/ToastWrapper.tsx';

function App() {
  return (
    <ToastWrapper>
      <AuthWrapper>
        <BrowserRouter>
          <Navbar />
          <RoutesConfig />
        </BrowserRouter>
      </AuthWrapper>
    </ToastWrapper>
  );
}

export default App;
