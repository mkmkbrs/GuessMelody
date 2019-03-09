const hideBtn = () => {
    document.getElementById("start-btn").classList.add('hidden');
    document.getElementById("answer-group").classList.remove('hidden');
    document.getElementById("volume-icn").classList.remove('hidden');
    document.getElementById("volSlider").classList.remove('hidden');
    document.getElementById("volDisplay").classList.remove('hidden');
    document.getElementById("btn-endgame").classList.remove('hidden');
    sound.play()
}

const startTheGame = () => {
	document.getElementById("info-head").innerHTML = 'Готовы?';
	document.getElementById("start-btn").classList.remove('hidden')
}

setTimeout(startTheGame, 5000)
