// Read JSON into variable
let url = 'https://raw.githubusercontent.com/mkmkbrs/test/master/pop_set_01_en.json';

//Get info from url and use it to declare artists, songNames and urls

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
    	var arrayLength = array.length;
    	for (var i = 0; i < arrayLength; i++) {
        	tempArtistArr.push(jsonData[i].artist);
        	tempSongNameArr.push(jsonData[i].songName);
        	tempSrcArr.push(jsonData[i].url);
        	console.log('Temps are:');
        	console.log(tempArtistArr);
        	console.log(tempSongNameArr);
        	console.log(tempSrcArr);
        	artist = tempArtistArr[currentSongNum];
        	songName = tempSongNameArr[currentSongNum];
        	srcArr = tempSrcArr[currentSongNum];
        	console.log('Vars are:')
        	console.log(artist);
        	console.log(songName);
        	console.log(srcArr);
        	// Throws error at the end but its fine for now

        	sound = new Howl({
			 	src: srcArr,
			 	format: ['webm', 'mp3'],
			  	volume: currentVol,
			  	preload: true,
			  	onplay: () => {
			  		isPlaying = true;
			  		console.log(isPlaying);
			  		document.getElementById("info-head").innerHTML = 'Playing...';
			  		document.getElementById("info-line").innerHTML = ' ';
					songFadeFunc();
			  	},
			  	onpause: () => {
			  		document.getElementById("info-head").innerHTML = 'Your answer?';
			  		document.getElementById("info-line").innerHTML = ' ';
			  	},
			  	onend: () => {
			  		isPlaying = false;
			  		console.log(isPlaying);
			  		document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
			  		checkGameState();
				}
			});
    	}

		jsonData = false;

	}
}

const togglePause = () => {
	validationFunc();

    if (isPlaying === true) {
    	sound.pause();
    	isPlaying = false;
    } else if (isPlaying === false && validation === true || validation === false){
    	clearTimeout(songFade);
        document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
  		checkGameState();
    }
};

const changeVars = () => {
	currentSongNum = ++currentSongNum;

	var artist = tempArtistArr[currentSongNum];
    var songName = tempSongNameArr[currentSongNum];
    var srcArr = tempSrcArr[currentSongNum];

    sound = new Howl({
	 	src: srcArr,
	 	format: ['webm', 'mp3'],
	  	volume: currentVol,
	  	preload: true,
	  	onplay: () => {
	  		isPlaying = true;
	  		console.log(isPlaying);
	  		document.getElementById("info-head").innerHTML = 'Playing...';
	  		document.getElementById("info-line").innerHTML = ' ';
			songFadeFunc();
	  	},
	  	onpause: () => {
	  		document.getElementById("info-head").innerHTML = 'Your answer?';
	  		document.getElementById("info-line").innerHTML = ' ';
	  	},
	  	onend: () => {
	  		isPlaying = false;
	  		console.log(isPlaying);
	  		document.getElementById("info-line").innerHTML = artist + ' - ' + songName;
	  		checkGameState();
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
		sound.play();
	} else {
		document.getElementById("info-head").innerHTML = 'Game Over'; 
 	    document.getElementById('answer-btn').setAttribute("disabled", "true");
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
