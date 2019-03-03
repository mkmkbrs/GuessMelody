// Im not using it and will delete later

const loadInArray = (jsonDataVar, globalVar, name, tempArr) => {
	var i = 0;
	globalVar = jsonDataVar[i].name;
	var arrayLength = globalVar.length;

	for (var i = 0; i < arrayLength; i++) {
    	tempArr.push(jsonDataVar);
    	console.log(tempArr);
    	// Throws error at the end but its fine for now
	}	
}


		// var i = 0;

		// artist = jsonData[i].artist;
  //   	var artistLength = artist.length;
  //   	for (var i = 0; i < artistLength; i++) {
  //       	tempArtistArr.push(jsonData[i].artist);
  //       	console.log(tempArtistArr);
  //       	// Throws error at the end but its fine for now
  //   	}
