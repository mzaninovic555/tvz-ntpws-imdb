import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutesConfig from './routes/RoutesConfig.tsx';
import AuthWrapper from './common/authentication/AuthWrapper.tsx';
import Navbar from './Components/Navbar.tsx';

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <RoutesConfig />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
