import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllVideo from './AllVideo';
import Home from './Home';
import Login from './Login';
import MainVideo from './MainVideo';
import Nav from './Nav';
import SignUp from './SignUp';
function AllRoute() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<SignUp />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/Home' element={<Home />} />
				<Route path='/Nav' element={<Nav />} />
				<Route path='/AllVideo' element={<AllVideo />} />
				<Route path='/MainVideo' element={<MainVideo />} />
			</Routes>
		</div>
	);
}

export default AllRoute;
