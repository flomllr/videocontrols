document.addEventListener('DOMContentLoaded', function() {
	function insertSlider(video) {
		const emptyMessage = document.getElementById('empty');
		if(emptyMessage) {
			emptyMessage.remove();
		};
		
		const {id, speed} = video;

		const valueText = document.createElement('p');
		valueText.innerHTML = "Speed: ";

		const valueElement = document.createElement('span');
		const valueElementId = 'value' + id;
		valueElement.id = valueElementId;
		valueElement.innerHTML = speed;

		valueText.appendChild(valueElement);

		const slider = document.createElement('input');
		slider.type = 'range';
		slider.min = '25';
		slider.max = '500';
		slider.id = 'slider' + id;
		slider.value = speed * 100;

		slider.oninput = function() {
			const newSpeed = this.value / 100;
			document.getElementById(valueElementId).innerHTML = newSpeed;
			
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				chrome.tabs.sendRequest(tabs[0].id, {
					action: 'SET_VIDEO_SPEED',
					payload: {
						id,
						speed: newSpeed
					}
				});
			});
			
			console.log(videoElement, valueElement, this.value);
		}
		
		const wrapper = document.createElement('div');
		wrapper.appendChild(valueText);
		wrapper.appendChild(slider);
		
		const sliderArea = document.getElementById('sliderArea');
		sliderArea.appendChild(wrapper);
	}

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {action: 'GET_VIDEOS'}, (response) => {
			console.log(response);
			const {videos} = response;
			videos.forEach(insertSlider);
		});
	});
});
  
