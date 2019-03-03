// Read JSON into variable
let url = 'https://raw.githubusercontent.com/mkmkbrs/test/master/pop_set_01_en.json';

//Get info from url and use it to declare artists, songNames and urls

let currentSongNum = 0;

var jsonData;

var artist;
var songName;
var srcArr;

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
	jsonData = shuffle(data);
}

function draw() {
	if (jsonData) {
		// When data is ready -- load it into vars
		console.log('Data loaded.');
		artist = getSafe(() => jsonData[currentSongNum].artist);
		console.log(artist);
		songName = getSafe(() => jsonData[currentSongNum].songName);
		console.log(songName);
		// Sound source defaults to .webm and fallsback to .mp3 (only .webm's for test)
		srcArr = [jsonData[currentSongNum].url];

		// Create new Howl sound and put vars into it
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
		  		changeSrc(srcArr[++currentSongNum]);
			}
		});

		jsonData = false;

	}
}

// Shuffle songs in array
//shuffle(srcArr);

const togglePause = () => {
	validationFunc();

    if (isPlaying === true) {
    	sound.pause();
    	isPlaying = false;
    } else if (isPlaying === false && validation === true || validation === false){
    	clearTimeout(songFade);
        document.getElementById("info-line").innerHTML = artist + ' - ' + songName;  		
  		changeSrc(srcArr[++currentSongNum]);
    }
};

const changeSrc = (newSrc) => {
	setup();
	gotData();

	if (undefined !== newSrc && newSrc.length) {
    // newSrc is not undefined and has truthy property _length_
    // do stuff
	    sound.unload();
	    sound._src = newSrc;
	    sound.load();
	    setTimeout(nextSong, 5000);
	} else {
		setTimeout(nextSong, 5000);
	}
}

function getSafe(fn) {
    try {
        return fn();
    } catch (e) {
    	// If there is no more songs -- display Game over and disble answer btn
	    console.log('Game Over');
	    document.getElementById("info-head").innerHTML = 'Game Over'; 
	    document.getElementById("info-line").innerHTML = artist + ' - ' + songName; 
	    document.getElementById('answer-btn').setAttribute("disabled", "true");
	    gameOver = true;
	    return jsonData[--currentSongNum].artist;
    }
}

const nextSong = () => {
	if (!gameOver) {
		sound.play();
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
