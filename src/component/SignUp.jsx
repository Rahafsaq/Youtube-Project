import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [comment, setComment] = useState('');
	const navigate = useNavigate();
	const handleLogin = () => {
		axios
			.post('https://6572272ad61ba6fcc0147626.mockapi.io/userInfo', {
				name: name,
				password: password,
				comment: comment,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		navigate('/Home');
	};
	return (
		<div className='flex justify-center  h-[40vh]'>
			<div className='flex justify-center items-center rounded-lg bg-slate-200 mt-32 flex-col h-[50vh] gap-3 w-[30vw] border'>
				<img className='w-[20vw]' src='https://cdn.usbrandcolors.com/images/logos/youtube-logo.svg' alt='' />
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					className='placeholder:p-1 p-2 rounded-3xl w-[22vw] mt-4'
					type='text'
					placeholder='Enter userName'
				/>
				<input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					className='placeholder:p-1 p-2 rounded-3xl w-[22vw]'
					type='password'
					placeholder='Enter password'
				/>
				<button onClick={handleLogin} className='bg-[#282828] mt-5 w-[10vw] p-2 text-white rounded-3xl'>
					Login
				</button>
			</div>
		</div>
	);
}

export default SignUp;
