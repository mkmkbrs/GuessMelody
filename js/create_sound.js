const createSound = () => {
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
	  		//changeSrc(srcArr[++currentSongNum]);
	  		changeVars();
		}
	});
}
