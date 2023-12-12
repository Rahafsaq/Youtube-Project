// import React from 'react';

// function Nav() {
// 	const [search, setSearch] = React.useState('');

// 	return (
// 		<div className=' h-[8vh]  p-7  gap-10'>
// 			<div className='flex h-full items-center justify-end gap-36'>
// 				<div className='flex items-center'>
// 					<button className='rounded-l-3xl flex justify-center items-center hover:bg-[#dcd8d8] h-[7vh] w-[6vw] border  p-1 bg-[#F8F8F8]'>
// 						<i className='material-icons'>
// 							<span className='material-symbols-outlined'>search</span>
// 						</i>
// 					</button>

// 					<input
// 						type='search'
// 						placeholder='Search'
// 						className='h-[7vh] w-[40vw] border border-gray-300 rounded-r-3xl placeholder:p-1 p-2'
// 					/>
// 				</div>

// 				<img
// 					className='w-[8vw] '
// 					src='https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg'
// 					alt=''
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// export default Nav;
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Nav({ onSearch }) {
	const [search, setSearch] = React.useState('');
	const navigate = useNavigate();
	const handleSearch = () => {
		// navigate(`/Home?search=${search}`);
		navigate(`/Home`);
		onSearch(search);
	};

	return (
		<div className='h-[8vh] p-7 gap-10'>
			<div className='flex h-full items-center justify-end gap-36'>
				<div className='flex items-center'>
					<button
						onClick={handleSearch}
						className='rounded-l-3xl flex justify-center items-center hover:bg-[#dcd8d8] h-[7vh] w-[6vw] border  p-1 bg-[#F8F8F8]'
					>
						<i className='material-icons'>
							<span className='material-symbols-outlined'>search</span>
						</i>
					</button>

					<input
						type='search'
						placeholder='Search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='h-[7vh] w-[40vw] border border-gray-300 rounded-r-3xl placeholder:p-1 p-2'
					/>
				</div>

				<img
					className='w-[8vw] '
					src='https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg'
					alt=''
				/>
			</div>
		</div>
	);
}

export default Nav;
