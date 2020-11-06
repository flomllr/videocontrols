var videoHandlers = {};
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action === "GET_VIDEOS") {
		const videos = [];

		document.querySelectorAll('video').forEach(video => {
			const id = Math.random() + '';
			videos.push({id, speed: video.playbackRate});
			videoHandlers[id] = (speed) => {
				video.playbackRate = speed;
			}
		});

		sendResponse({videos});
		return;
	}

	if(request.action === "SET_VIDEO_SPEED") {
		const {id, speed} = request.payload;
		const handler = videoHandlers[id];
		console.log(handler);
		if(handler) {
			handler(speed);
		}
		return;
	}

	sendResponse({});

})
