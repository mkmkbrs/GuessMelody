// Validate text inside answer-input
let validation;

const validateForm = () => {
	let answer = document.getElementById('answer-input').value;

	// Set acceptable input values
	a = answer.localeCompare(songName, undefined, {sensitivity: 'accent'});
	b = answer.localeCompare(artist + ' ' + songName, undefined, {sensitivity: 'accent'});
	c = answer.localeCompare(songName + ' ' + artist, undefined, {sensitivity: 'accent'});

	// Check answer-input value
	// answer-input only accepts songName or songName + artist but not the artist only 
	if (a === 0 || b === 0 || c === 0) {
		document.getElementById('info-head').innerHTML = 'Correct!';
		return true;
	} else {
		document.getElementById('info-head').innerHTML = 'Incorrect!';
		return false;
	}
}

const validationFunc = () => {
	validation = validateForm();
	document.getElementById('answer-input').value = "";
}
