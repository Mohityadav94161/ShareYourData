import './App.css';
import Register from './containers/Register';
// import AuthUsername from './components/Authentication Components/AuthUsername';
import AuthPhoneNumber from './components/Authentication Components/AuthPhoneNumber';
import LoginPage from './containers/LoginPage';
import AuthPage from './containers/AuthPage';
import LandingPage from './containers/LandingPage';
import NotepadCard from './components/Upload file and notepad/NotepadCard';
import UserPage from './containers/UserPage';
import { Navbar } from './components/footer and Headers/Navbar';
import { Footer } from './components/footer and Headers/Footer';
import AuthUsername from './components/Authentication Components/AuthUsername';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Register /> */}
      {/* <AuthPhoneNumber />
      */}
      <LoginPage />
      {/* <Register />  */}
      {/* <AuthPage /> */}
      
      {/* <NotepadCard/> */}

      {/* <AuthPhoneNumber />
      <AuthUsername/> */}

      <UserPage/>
      <LandingPage />
      <Footer/>
    </div>
  );
}

export default App;
