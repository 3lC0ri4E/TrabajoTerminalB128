/** @format */

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Settings from './pages/Settings';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import News from './pages/News';

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
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/" element={<Main />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/noticias" element={<News />} />
            </Routes>
        </div>
    );
}

export default App;
