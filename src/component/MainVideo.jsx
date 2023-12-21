import axios from 'axios';
import React from 'react';
function MainVideo() {
	const [video, setVideo] = React.useState([]);
	React.useEffect(() => {
		axios

			.get(
				'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&key=AIzaSyDRmlB4PD_S7vCRajSy4WxpiXnhbtiLMUI'
			)
			.then(function (response) {
				console.log(response.data.items);
				setVideo(response.data.items);
			});
	}, []);

	return (
		<div>
			<iframe
				// width='190'
				// height='110'
				className='rounded-2xl w-[50vw] h-[65vh]'
				src={`https://www.youtube.com/embed/${video.id}`}
			></iframe>
			<p className='text-xl font-semibold'>lets make ideo</p>
		</div>
	);
}

export default MainVideo;
