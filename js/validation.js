// Validate text inside answer-input

let validation;

const validateForm = () => {
	let answer = document.getElementById('answer-input').value;

	a = FuzzySet([songName, songName + ' ' + artist], true);
	a_result = a.get(answer);

	// Check answer-input value

	if (a_result === null){
		document.getElementById('info-head').innerHTML = 'Нет!';
		document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
		document.getElementById('answer-input').value = "";
		return false;
	} else if (a_result[0][0] >= 0.5) {
		document.getElementById('info-head').innerHTML = 'Верно!';
		document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
		document.getElementById('answer-input').value = "";
		guesses += 1;
		return true;
	}
}

const validationFunc = () => {
	validation = validateForm();
	document.getElementById('answer-input').value = "";
}
