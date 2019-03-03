// Create a slider
const slider = document.getElementById("volSlider");
const output = document.getElementById("volDisplay");
const sliderstep = 0.01;

// Display the default slider value
output.innerHTML = slider.value;

// Update the slider value on input
slider.oninput = function() {
	output.innerHTML = this.value;
	sound.volume(this.value);
};

// Update the slider value on wheel
slider.onwheel = function(e) {
	slider.value = + slider.value + (e.wheelDelta >= 0 ? 0.01 : -0.01);
	output.innerHTML = slider.value;
	sound.volume(slider.value);
};
