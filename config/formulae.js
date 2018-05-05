var jbestMap = function(games){
  //Create a blank best map object
  var bestMap = {mapName: "", winPercent: 0, noOfGames: 0};

  //Get the formatted map data.
  var mapWinPercentArr = getMapData(games);

  //Loop thorugh the array and add a member to each object with the win percentage on each map.
  for(var i = 0; i < mapWinPercentArr.length; i++){
    mapWinPercentArr[i].winPercent = mapWinPercentArr[i].wins / mapWinPercentArr[i].noOfGames;
  }


  for(var i = 0; i < mapWinPercentArr.length; i++){
    //Loop through the array.
    //If the win percentage is higher then set bestMap to that map object.
    if(mapWinPercentArr[i].winPercent > bestMap.winPercent){
      bestMap = mapWinPercentArr[i];
    }
    //If the win percentage is the same but one map has more playtime set that object to best map.
    if(mapWinPercentArr[i].winPercent === bestMap.winPercent && mapWinPercentArr[i].noOfGames > bestMap.noOfGames){
      bestMap = mapWinPercentArr[i];
    }
  }

  return bestMap;
}

//Expose bestMap as a function when requiring formulae.
module.exports.bestMap = jbestMap;

var jbestHero = function(games){
  //Create a blank hero object.
  var bestHero = {hero: "", winPercent: 0, noOfGames: 0};

  var heroWinPercentArr = getHeroData(games);
  //Get the formatted hero data.

  //Loop through the array and add a member for the win percentage.
  for(var i = 0; i < heroWinPercentArr.length; i++){
    heroWinPercentArr[i].winPercent = heroWinPercentArr[i].wins / heroWinPercentArr[i].noOfGames;
  }

  for(var i = 0; i < heroWinPercentArr.length; i++){
    //Loop through the array.
    //If the win percentage is higher then set bestMap to that map object.
    if(heroWinPercentArr[i].winPercent > bestHero.winPercent){
      bestHero = heroWinPercentArr[i];
    }
    //If the win percentage is the same but one hero has more playtime set that object to best hero.
    if(heroWinPercentArr[i].winPercent === bestHero.winPercent && heroWinPercentArr[i].noOfGames > bestHero.noOfGames){
      bestHero = heroWinPercentArr[i];
    }
  }

  return bestHero;
}

//Expose bestHero as a function when requiring formulae.
module.exports.bestHero = jbestHero;

var jheroPlaytime = function(games){
  //Initialize an empty array.
  var heroPlaytime = [];

  //Get the formatted hero data.
  var heroDataArr = getHeroData(games);

  //Go through the hero data array and push to the hero playtime array the hero name and the number of games played.
  heroDataArr.forEach(function(heroData){
    heroPlaytime.push([heroData.hero, heroData.noOfGames]);
  });


  //Loop through the array and sort it by the number of games played on the hero.
  heroPlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  //Add the title array to the start of the hero playtime array to follow google visualization formatting.
  heroPlaytime.unshift(["Hero", "Playtime"]);

  return heroPlaytime;
}

//Exose heroPlaytime as a function when requiring formulae.
module.exports.heroPlaytime = jheroPlaytime;

var jgameModePlaytime = function(games, maps){
  //Initialize variables to represent the number of games played in each map type.
  var assault = 0;
  var hybrid = 0;
  var control = 0;
  var escort = 0;

  //Get the formatted map data.
  var mapDataArr = getMapData(games);

  //Loop through the map data array.
  mapDataArr.forEach(function(mapData){
    //Switch on the map type name to add 1 to the number of games played on a map type.
    switch(getMapType(mapData.mapName, maps)){
      case "assault":
        assault++;
      case "hybrid":
        hybrid++;
      case "control":
        control++;
      case "escort":
        escort++;
    }
  });

  //Setup an array with the number of games played in each map type.
  gameModePlaytime = [["Assault", assault], ["Hybrid", hybrid], ["Control", control], ["Escort", escort]]

  //Sort the list by the number of games played on each map type.
  gameModePlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  //Add the title array to the start of the array to follow google visualization formatting.
  gameModePlaytime.unshift(["Game Mode", "Playtime"]);

  return gameModePlaytime;
}

//Expose gameModePlaytime as a function when requiring formulae.
module.exports.gameModePlaytime = jgameModePlaytime;

var jheroTypePlaytime = function(games, heroes){
  //Initialize variables to represent the number of times each hero type is played.
  var offense = 0;
  var defense = 0;
  var tank = 0;
  var support = 0;

  //Get the formatted hero data.
  var heroDataArr = getHeroData(games);

  //Loop through the hero data and switch to add 1 to the number of times each hero type is played.
  heroDataArr.forEach(function(heroData){
    switch(getHeroType(heroData.hero, heroes)){
      case "offense":
        offense++;
      case "defense":
        defense++;
      case "tank":
        tank++;
      case "support":
        support++;
    }
  });

  //Set up an arry with the number of times each hero type is played.
  heroTypePlaytime = [["Offense", offense], ["Defense", defense], ["Tank", tank], ["Support", support]]

  //Sort the array by the number of times each hero type is played.
  heroTypePlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  //Add the title array to the start of the array to follow google visualization formatting.
  heroTypePlaytime.unshift(["Hero Mode", "Playtime"]);

  return heroTypePlaytime;
}

//Expose heroTypePlaytime as a function when requiring formuale.
module.exports.heroTypePlaytime = jheroTypePlaytime;

function getMapData(games){
  //Set up an empty array for the game data.
  var gameData = [];

  //Loop through the games.
  games.forEach(function(game) {
    //Set a variable x an object if an object exists in the gameData array such that the mapName on the object is the mapName in the game we are currently looking at.
    var x = gameData.find(e => e.mapName === game.mapName);

    //Set up a variable for if the game was won or lost.
    var winLose;
    if(game.winLose){
      winLose = 1;
    } else {
      winLose = 0;
    }

    //If no object is found then x will be of the type undefined.
    //Therefore if the map was not found we can push it to the gameData array.
    if(typeof(x) == "undefined"){
        gameData.push({ mapName: game.mapName, wins: winLose, noOfGames: 1 });
    } else {
    //Otherwise the map already exists in the array.
    //Therefore we should find the index of the object then increase the wins member by winLose and increase the number of games by 1.
      let index = gameData.indexOf(x);
      gameData.fill(x.wins += winLose, index, index++);
      gameData.fill(x.noOfGames++, index, index++);
    }

  });

  return gameData;
}

function getHeroData(games){
  //Set up a gameData array.
  var gameData = [];

  //Loop through the games.
  games.forEach(function(game) {

    //Loop through the array of heroes played in the game.
    for(var i = 0; i < game.heroes.length; i++){
      //Set a variable x an object if an object exists in the gameData array such that the hero name on the object is the hero name in the game we are currently looking at.
      var x = gameData.find(e => e.hero === game.heroes[i]);

      //Set a variable to whether the game was won or not.
      var winLose;
      if(game.winLose){
        winLose = 1;
      } else {
        winLose = 0;
      }

      //Similarly to getMapData push the hero to the array if it is not currently in the array.
      if(typeof(x) == "undefined"){
        gameData.push({ hero: game.heroes[i], wins: winLose, noOfGames: 1 });
      } else {
      //Similarly again, update the relevant data if the hero was found in the array.
        let index = gameData.indexOf(x);
        gameData.fill(x.wins += winLose, index, index++);
        gameData.fill(x.noOfGames++, index, index++);
      }

    }
  });

  return gameData;
}

function getMapType(name, maps){
  //Set x to the object where the name of the map is that of the name passed to the function.
  var x = maps.find(e => e.name === name);

  //If the map was not found then there is an error so we should throw an error message to the console.
  if(typeof(x) == "undefined"){
    throw new Error('The map could not be found in the list of maps.\nMap searched for: ' + name);
  } else {
    //Otherwise return the map type.
    return x.mapType;
  }
}

function getHeroType(name, heroes){
  //Set x to the object where the name of the hero is the name passed to the function.
  var x = heroes.find(e => e.name === name);

  //Again, if x is undefined we have an error.
  if(typeof(x) == "undefined"){
    throw new Error('The Hero could not be found in the list of heroes.\nHero searched for: ' + name);
  } else {
  //Again, return the hero type if there was no error.
    return x.type;
  }
}
