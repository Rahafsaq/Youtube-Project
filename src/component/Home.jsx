import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [allVideo, setAllVideo] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [searchResult, setSearchResult] = React.useState('');

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					// `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=AIzaSyDRmlB4PD_S7vCRajSy4WxpiXnhbtiLMUI`
					`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&key=AIzaSyDRmlB4PD_S7vCRajSy4WxpiXnhbtiLMUI`
				);

				console.log(response.data.items);
				setAllVideo(response.data.items);
			} catch (error) {
				console.error('Error fetching videos:', error);
			}
		};

		fetchData();
	}, []);

	const navigate = useNavigate();
	const handleMoveToVid = () => {
		navigate('/AllVideo');
	};
	const handleSearch = () => {
		const searchResult = allVideo.filter((item) => item.snippet.title.toLowerCase().includes(search.toLowerCase()));
		setSearchResult(searchResult);
	};
	return (
		<div>
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
			<div onClick={handleMoveToVid} className='grid grid-cols-3 mt-10 gap-2'>
				{(searchResult.length > 0 ? searchResult : allVideo).map((item) => (
					<div key={item.etag} className='flex flex-col items-center gap-2'>
						<div>
							<img src={item.snippet.thumbnails.high.url} className='w-[28vw] h-[38vh] rounded-lg' />
						</div>
						<div className=''>
							<p className='font-semibold w-[28vw]'>{item.snippet.title}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
