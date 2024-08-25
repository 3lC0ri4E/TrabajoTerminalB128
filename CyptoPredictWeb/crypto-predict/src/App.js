/** @format */

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import SideBar from './pages/Sidebar';
import Settings from './pages/Settings';
import Main from './pages/Main';
import Navbar from './pages/Navbar';

function App() {
    return (
        <div className='App'>
            {/* <Login /> */}
            {/* <SignUp /> */}
            {/* <SideBar /> */}
            {/* <Settings /> */}
            {/* <Main /> */}
            {/* <Navbar /> */}
            <Routes>
                {/* Aqui se agregan las rutas para direccionar dentro de la pagina */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Main />} />

            </Routes>
        </div>
    );
}

export default App;
