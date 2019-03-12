let currentSongNum = 0;

var jsonData;

var artist;
var tempArtistArr = [];
var songName;
var tempSongNameArr = [];
var srcArr;
var tempSrcArr = [];

var sound;
var gameOver = false;

// Set current volume to the slider value
let currentVol = slider.value;
let isPlaying = false; 
let songFade;

let guesses = 0;
let songsPerGame = 10;

function setup() {
	loadJSON(url, gotData);
}

const gotData = (data) => {
	// Shuffle data when loaded (once!)
	jsonData = shuffle(data);
}

function draw() {

	if (jsonData) {
		// When data is ready -- load it into arrays and extract it into vars
		console.log('Data loaded.');

		var i = 0;

		var array = jsonData[i].artist;
		// Load's 'em all (should load only some, around 20-30 per game)
    	var arrayLength = songsPerGame; //array.length;
    	for (var i = 0; i < arrayLength; i++) {
        	tempArtistArr.push(jsonData[i].artist);
        	tempSongNameArr.push(jsonData[i].songName);
        	tempSrcArr.push(jsonData[i].url);
        	// console.log('Temps are:');
        	// console.log(tempArtistArr);
        	// console.log(tempSongNameArr);
        	// console.log(tempSrcArr);
        	artist = tempArtistArr[currentSongNum];
        	songName = tempSongNameArr[currentSongNum];
        	srcArr = tempSrcArr[currentSongNum];
        	// console.log('Vars are:')
        	// console.log(artist);
        	// console.log(songName);
        	// console.log(srcArr);

        	// Throws error at the end but its fine for now

        	sound = new Howl({
			 	src: srcArr,
			 	format: ['webm', 'mp3'],
			  	volume: currentVol,
			  	preload: true,
			  	onplay: () => {
			  		isPlaying = true;
			  		console.log(isPlaying);
			  		document.getElementById("info-head").innerHTML = 'Слушаем...';
			  		document.getElementById("info-line").innerHTML = ' ';
					songFadeFunc();
			  	},
			  	onpause: () => {
			  		document.getElementById("info-head").innerHTML = 'Ваш ответ?';
			  		document.getElementById("info-line").innerHTML = ' ';
			  	},
			  	onend: () => {
			  		togglePause();
			  		// isPlaying = false;
			  		// console.log(isPlaying);
			  		// document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
			  		// checkGameState();
				}
			});
    	}

		jsonData = false;

	}

	// Dont let the user to answer while music is playing
	if (document.getElementById('answer-input').value && isPlaying === true) {
		document.getElementById('answer-input').value = "";
	}
}

const togglePause = () => {
    if (isPlaying === true) {
    	sound.pause();
    	document.getElementById('answer-input').placeholder = "Введите ответ"
    	isPlaying = false;
    } else if (isPlaying === false){
    	validationFunc();
    	clearTimeout(songFade);
    	document.getElementById('answer-input').placeholder = "Нажмите Enter, чтобы ответить"
  		checkGameState();
    }
};

const changeVars = () => {
	currentSongNum = ++currentSongNum;

	artist = tempArtistArr[currentSongNum];
    songName = tempSongNameArr[currentSongNum];
    srcArr = tempSrcArr[currentSongNum];

    sound = new Howl({
	 	src: srcArr,
	 	format: ['webm', 'mp3'],
	  	volume: currentVol,
	  	preload: true,
	  	onplay: () => {
	  		isPlaying = true;
	  		console.log(isPlaying);
	  		document.getElementById("info-head").innerHTML = 'Слушаем...';
	  		document.getElementById("info-line").innerHTML = ' ';
			songFadeFunc();
	  	},
	  	onpause: () => {
	  		document.getElementById("info-head").innerHTML = 'Ваш ответ?';
	  		document.getElementById("info-line").innerHTML = ' ';
	  	},
	  	onend: () => {
	  		togglePause();
		}
	});
}

const checkGameState = () => {
	changeVars();
	setTimeout(nextSong, 5000);
}

const nextSong = () => {
	if (sound._src === undefined) {
		gameOver = true;
	}

	if (!gameOver) {
		sound.volume(slider.value);
		sound.play();
	} else {
		document.getElementById("info-head").innerHTML = 'Игра окончена'; 
		document.getElementById("info-line").innerHTML = 'Вы угадали ' + guesses + ' из ' + songsPerGame + ' песен.';

 	    document.getElementById("answer-btn").setAttribute("disabled", "true");
 	    document.getElementById("answer-group").classList.add('hidden');
 	    document.getElementById("volSlider").classList.add('hidden');
    	document.getElementById("volDisplay").classList.add('hidden');
		document.getElementById("volume-icn").classList.add('hidden');
		document.getElementById("btn-replay").classList.remove('hidden');
	}
}

// Fades sound and sets the volume back to slider value for the next playback
const fadeSound = () => {
	sound.once( 'fade', () => { });
	sound.fade(sound.volume(), 0, 2000); // Fade clip for 2 seconds
	setTimeout(setVolToCurrent, 3000);
};

const songFadeFunc = () => {
	songFade = setTimeout(fadeSound, 8000); // Audio clip is 10 sec long, fade starts at the 7th second
}

const setVolToCurrent = () => {
	sound.volume(currentVol);
};
