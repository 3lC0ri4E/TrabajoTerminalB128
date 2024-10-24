/** @format */

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Settings from './pages/Settings';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import QuienesSomos from './pages/QuienesSomos';
import Mision from './pages/Mision';
import Vision from './pages/Vision';
import Proposito from './pages/Proposito';

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
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/ajustes'
					element={<Settings />}
				/>
				<Route
					path='/'
					element={<Main />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/noticias'
					element={<News />}
				/>
				<Route
					path='/quienessomos'
					element={<QuienesSomos />}
				/>
				<Route
					path='/mision'
					element={<Mision />}
				/>
				<Route
					path='/vision'
					element={<Vision />}
				/>
				<Route
					path='/proposito'
					element={<Proposito />}
				/>
			</Routes>
		</div>
	);
}

export default App;
