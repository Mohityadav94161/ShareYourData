import './App.css';
import Register from './containers/Register';
// import AuthPhoneNumber from './components/Authentication Components/AuthPhoneNumber';
import LoginPage from './containers/LoginPage';
import AuthPage from './containers/AuthPage';
import LandingPage from './containers/LandingPage';
// import NotepadCard from './components/Upload file and notepad/NotepadCard';
import UserPage from './containers/UserPage';
import { Navbar } from './components/footer and Headers/Navbar';
import { Footer } from './components/footer and Headers/Footer';
// import AuthUsername from './components/Authentication Components/AuthUsername';
import {UserInfo} from './components/User/UserInfo';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
    

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar  /> */}
        <ToastContainer className="ToastContainer"  />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />

          <Route exact path="/home" element={<UserPage />} />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/login" element={<LoginPage />} />

          <Route exact path="/userInfo" element={<UserInfo />} />

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
