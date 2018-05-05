var jbestMap = function(games){
  var bestMap = {mapName: "", winPercent: 0, noOfGames: 0};

  var mapWinPercentArr = getMapData(games);

  for(var i = 0; i < mapWinPercentArr.length; i++){
    mapWinPercentArr[i].winPercent = mapWinPercentArr[i].wins / mapWinPercentArr[i].noOfGames;
  }

  for(var i = 0; i < mapWinPercentArr.length; i++){
    if(mapWinPercentArr[i].winPercent > bestMap.winPercent){
      bestMap = mapWinPercentArr[i];
    }
    if(mapWinPercentArr[i].winPercent === bestMap.winPercent && mapWinPercentArr[i].noOfGames > bestMap.noOfGames){
      bestMap = mapWinPercentArr[i];
    }
  }

  return bestMap;
}

module.exports.bestMap = jbestMap;

var jbestHero = function(games){
  var bestHero = {hero: "", winPercent: 0, noOfGames: 0};

  var heroWinPercentArr = getHeroData(games);

  for(var i = 0; i < heroWinPercentArr.length; i++){
    heroWinPercentArr[i].winPercent = heroWinPercentArr[i].wins / heroWinPercentArr[i].noOfGames;
  }

  for(var i = 0; i < heroWinPercentArr.length; i++){
    if(heroWinPercentArr[i].winPercent > bestHero.winPercent){
      bestHero = heroWinPercentArr[i];
    }
    if(heroWinPercentArr[i].winPercent === bestHero.winPercent && heroWinPercentArr[i].noOfGames > bestHero.noOfGames){
      bestHero = heroWinPercentArr[i];
    }
  }

  return bestHero;
}

module.exports.bestHero = jbestHero;

var jheroPlaytime = function(games){
  var heroPlaytime = [];

  var heroDataArr = getHeroData(games);

  heroDataArr.forEach(function(heroData){
    heroPlaytime.push([heroData.hero, heroData.noOfGames]);
  });



  heroPlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  heroPlaytime.unshift(["Hero", "Playtime"]);

  return heroPlaytime;
}

module.exports.heroPlaytime = jheroPlaytime;

var jgameModePlaytime = function(games, maps){

  var assault = 0;
  var hybrid = 0;
  var control = 0;
  var escort = 0;

  var mapDataArr = getMapData(games);

  mapDataArr.forEach(function(mapData){
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

  gameModePlaytime = [["Assault", assault], ["Hybrid", hybrid], ["Control", control], ["Escort", escort]]


  gameModePlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  gameModePlaytime.unshift(["Game Mode", "Playtime"]);

  return gameModePlaytime;
}

module.exports.gameModePlaytime = jgameModePlaytime;

var jheroTypePlaytime = function(games, heroes){

  var offense = 0;
  var defense = 0;
  var tank = 0;
  var support = 0;

  var heroDataArr = getHeroData(games);

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

  heroTypePlaytime = [["Offense", offense], ["Defense", defense], ["Tank", tank], ["Support", support]]


  heroTypePlaytime.sort(function(a,b){
    if(a[1]<b[1]){
      return 1;
    } else {
      return -1;
    }
  });

  heroTypePlaytime.unshift(["Hero Mode", "Playtime"]);

  return heroTypePlaytime;
}

module.exports.heroTypePlaytime = jheroTypePlaytime;

function getMapData(games){

  var gameData = [];

  games.forEach(function(game) {

    var x = gameData.find(e => e.mapName === game.mapName);

    var winLose;
    if(game.winLose){
      winLose = 1;
    } else {
      winLose = 0;
    }

    if(typeof(x) == "undefined"){
        gameData.push({ mapName: game.mapName, wins: winLose, noOfGames: 1 });
      } else {
        let index = gameData.indexOf(x);
        gameData.fill(x.wins += winLose, index, index++);
        gameData.fill(x.noOfGames++, index, index++);
      }

  });

  return gameData;
}

function getHeroData(games){

  var gameData = [];

  games.forEach(function(game) {

    for(var i = 0; i < game.heroes.length; i++){

      var x = gameData.find(e => e.hero === game.heroes[i]);

      var winLose;
      if(game.winLose){
        winLose = 1;
      } else {
        winLose = 0;
      }

      if(typeof(x) == "undefined"){
        gameData.push({ hero: game.heroes[i], wins: winLose, noOfGames: 1 });
      } else {
        let index = gameData.indexOf(x);
        gameData.fill(x.wins += winLose, index, index++);
        gameData.fill(x.noOfGames++, index, index++);
      }

    }
  });

  return gameData;
}

function getMapType(name, maps){
  var x = maps.find(e => e.name === name);

  if(typeof(x) == "undefined"){
    throw new Error('The map could not be found in the list of maps.\nMap searched for: ' + name);
  } else {
    return x.mapType;
  }
}

function getHeroType(name, heroes){
  var x = heroes.find(e => e.name === name);

  if(typeof(x) == "undefined"){
    throw new Error('The Hero could not be found in the list of heroes.\nHero searched for: ' + name);
  } else {
    return x.type;
  }
}
