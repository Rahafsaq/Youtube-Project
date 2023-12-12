import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from './Nav';

function AllVideo() {
	const [allVideo, setAllVideo] = useState([]);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [selectedVideoDetails, setSelectedVideoDetails] = useState('');
	// const [like, setLike] = useState('');
	const [likeClicked, setLikeClicked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [userInfo, setUserInfo] = useState([]);
	const [comment, setComment] = useState('');

	useEffect(() => {
		// Fetch popular videos when the component mounts
		fetchPopularVideos();
	}, []);

	useEffect(() => {
		// Fetch details of the selected video when its ID changes
		if (selectedVideo) {
			fetchVideoDetails();
		}
	}, [selectedVideo]);
	////////////////////////////////////////////////////////////////////////////////////////////////////////for user comment
	// useEffect(() => {
	// 	axios.get('https://6572272ad61ba6fcc0147626.mockapi.io/userInfo').then(function (response) {
	// 		// handle success
	// 		setUserInfo(response.data);
	// 		console.log(response.data);
	// 	});
	// }, []);

	// const handleComment = () => {
	// 	axios
	// 		.put('https://6572272ad61ba6fcc0147626.mockapi.io/userInfo', {
	// 			comment: comment,
	// 		})
	// 		.then(function (response) {
	// 			console.log(response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };
	const handleComment = (userId) => {
		// Assuming userInfo is an array and you have a specific user you want to update
		const updatedUserInfo = userInfo.map((user) => {
			if (user.id === userId) {
				return { ...user, comment: comment };
			}
			return user;
		});

		// Update user information with the new comment
		axios
			.put(`https://6572272ad61ba6fcc0147626.mockapi.io/userInfo/${userId}`, { comment: comment })
			.then((response) => {
				console.log(response);
				setUserInfo(updatedUserInfo);
				// Optionally, clear the comment input after successfully updating
				setComment('');
			})
			.catch((error) => {
				console.error('Error updating comment:', error);
			});
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////for user comment
	const fetchPopularVideos = () => {
		axios
			.get(
				'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&key=AIzaSyDRmlB4PD_S7vCRajSy4WxpiXnhbtiLMUI'
			)
			.then(function (response) {
				console.log(response.data.items);
				setAllVideo(response.data.items);

				// Set the first video as the selected video when the component mounts
				if (response.data.items.length > 0) {
					setSelectedVideo(response.data.items[0].id);
				}
			})
			.catch(function (error) {
				console.error('Error fetching popular videos:', error);
			});
	};

	const handleLike = () => {
		setLikes(likes + 1);
	};

	// Function to handle dislike
	const handleDislike = () => {
		setDislikes(dislikes + 1);
	};

	const fetchVideoDetails = () => {
		axios
			.get('https://www.googleapis.com/youtube/v3/videos', {
				params: {
					part: 'snippet,statistics',
					id: selectedVideo,
					key: 'AIzaSyDRmlB4PD_S7vCRajSy4WxpiXnhbtiLMUI',
				},
			})
			.then(function (response) {
				console.log(response.data.items[0]);
				setSelectedVideoDetails(response.data.items[0]);
			})
			.catch(function (error) {
				console.error('Error fetching video details:', error);
			});
	};

	const handleVideoClick = (id) => {
		setSelectedVideo(id);
	};

	return (
		<div>
			<Nav />
			<div className='flex justify-center mt-8 gap-6'>
				<div className='flex flex-col gap-2'>
					<div className=' rounded-xl p-1 bg-[#d6d8d8] h-[28vh]'>
						<img
							className='w-[12vw]'
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png'
							alt=''
						/>
						<p className='w-[30vw] '>
							Unlock new opportunities and insights by connecting with me on LinkedIn. Let's grow together
							professionally!{' '}
							<a className='text-cyan-800' href='http://linkedin.com/in/rahaf-alqahtani-405bb1216'>
								[ Click Here 🚀 ]
							</a>{' '}
							#Networking #ProfessionalGrowth
						</p>
					</div>
					{allVideo.map((item) => (
						<div
							key={item.etag}
							className='flex items-center gap-2'
							onClick={() => handleVideoClick(item.id)}
						>
							<div className='text-right'>
								<p className='font-semibold w-[16vw]'>{item.snippet.title}</p>
								<div className='flex gap-2  justify-end'>
									{/* <p>{item.snippet.publishedAt}</p> */}
									<p>{item.statistics.viewCount} viewer</p>
								</div>
							</div>
							<div>
								<img
									src={item.snippet.thumbnails.high.url}
									className={`w-[14vw] h-[16vh] rounded-lg cursor-pointer ${
										item.id === selectedVideo ? 'border-2 border-stone-500' : ''
									}`}
									alt={item.snippet.title}
								/>
							</div>
						</div>
					))}
				</div>
				<div>
					{selectedVideoDetails && (
						<>
							<iframe
								className='rounded-2xl w-[55vw] h-[65vh]'
								src={`https://www.youtube.com/embed/${selectedVideo}`}
								title='YouTube Video'
							></iframe>
							{selectedVideoDetails && (
								<div className='text-xl w-[53vw] ml-4 text-justify font-semibold'>
									{selectedVideoDetails.snippet.title}
									<p>{selectedVideoDetails.statistics.likeCount}</p>
								</div>
							)}

							{/* start div for all buttons */}

							<div className='flex items-center mt-8 justify-between w-[55vw]   gap-4'>
								<div className='flex items-center  gap-4'>
									<button className='rounded-3xl flex justify-center items-center hover:bg-[#dcd8d8] h-[7vh] w-[8vw] border  p-1 bg-[#F8F8F8]'>
										<i className='flex material-icons'>
											<p>Share</p>
											<span className='material-symbols-outlined'>switch_access_shortcut</span>
										</i>
									</button>

									<div className='flex justify-between'>
										<button
											onClick={handleDislike}
											className='rounded-l-3xl flex justify-center items-center hover:bg-[#dcd8d8] h-[7vh] w-[6vw] border  p-1 bg-[#F8F8F8]'
										>
											<i className='flex  gap-2 material-icons'>
												{/* <p>0</p> */}
												{dislikes}
												<span className='material-symbols-outlined'>thumb_down</span>
											</i>
										</button>

										<button
											onClick={handleLike}
											className='rounded-r-3xl flex justify-center items-center hover:bg-[#dcd8d8] h-[7vh] w-[7vw] border  p-1 bg-[#F8F8F8]'
										>
											<i className='flex gap-2 material-icons'>
												{/* <p>{selectedVideoDetails.statistics.likeCount}</p> */}
												{likes}
												<span className='material-symbols-outlined'>thumb_up</span>
											</i>
										</button>
									</div>
								</div>
								<div className='flex items-center gap-3 '>
									<p className='font-semibold  '>{selectedVideoDetails.snippet.channelTitle}</p>
									<img
										className='w-[3vw] border-2 rounded-full'
										src='https://icon-library.com/images/channel-icon/channel-icon-21.jpg'
										alt=''
									/>
								</div>
							</div>
							{/* end div for all buttons */}
							<div className='flex justify-center rounded-2xl mt-6 w-[55vw] text-justify bg-[#F8F8F8]'>
								<p className=' w-[52vw] p-3 text-sm '>{selectedVideoDetails.snippet.description}</p>
							</div>
							<div className=' mt-6 w-[55vw]  text-right'>
								<p className='font-semibold text-lg'>Comments</p>

								<input
									value={comment}
									onChange={(e) => {
										setComment(e.target.value);
									}}
									type='text'
									placeholder='Add comment..'
									className=' w-[55vw] placeholder:text-right'
								/>
								<hr />
								<div className='mt-4  w-[55vw] flex justify-center gap-3'>
									<button
										onClick={handleComment}
										className='bg-[#F2F2F2] text-gray-500 p-2 rounded-3xl'
									>
										Comment
									</button>
									<button className='bg-black text-white p-2 rounded-3xl'>Cancel</button>
								</div>

								<div className='flex justify-end items-center mt-10 gap-4'>
									<div>
										<p className='font-semibold'>Rahaf</p>
										<p>good vid</p>
									</div>
									<div>
										<img
											className='w-[3vw] rounded-full border'
											src='https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png'
											alt=''
										/>
									</div>
								</div>
								{/* ////////////////////////////////////////////// */}
								{userInfo.map((item) => (
									<div key={userInfo.id} className='flex justify-end items-center mt-10 gap-4'>
										<div>
											<p className='font-semibold'>{item.name}</p>
											<p>{item.comment}</p>
										</div>
										<div>
											<img
												className='w-[3vw] rounded-full border'
												src='https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png'
												alt=''
											/>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default AllVideo;
