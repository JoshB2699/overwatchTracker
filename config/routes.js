//Require our mongoose schemas
const Map = require('../models/map.js');
const Game = require('../models/game.js');
const Hero = require('../models/hero.js');

const formulae = require('../config/formulae.js');

module.exports = function(app, mongoose, uuid){

  //On GET / render index.ejs to the DOM.
  app.get('/', function(req, res){
    res.render('index');
  });

  //On GET /input
  app.get('/input', function(req, res){

    //Search the mongoose database for all maps.
    Map.find({}, function(err, maps){

      //Sort the maps first by map type, then by name alphabetically.
       maps.sort(function(a,b){
          if (a.mapType === b.mapType){
            if(a.name>b.name){
              return 1;
            } else {
              return -1;
            }
          } else if(a.mapType > b.mapType){
             return 1;
          } else if(a.mapType < b.mapType){
             return -1;
          }
       });

       //Search the databse for all heroes.
       Hero.find({}, function(err,heroes){

         //Sort them alphabetically by name.
         heroes.sort(function(a,b){
          if(a.name>b.name){
            return 1;
          } else {
            return -1;
          }
         });

         //Render input.ejs and send the maps and heroes array.
        res.render('input', {
          maps: maps,
          heroes: heroes
        });
      });
    });
  });

  //On GET /stats
  app.get('/stats', function(req, res){
    //Create an empty object that we will store the statistics in.
    var stats = {};

    Hero.find({}, function(err,heroes){
      Map.find({}, function(err, maps){
        Game.find({}, function(err, games){

          stats.bestMap = formulae.bestMap(games);
          stats.bestHero = formulae.bestHero(games);

          //Render input.ejs and send the maps and heroes array.
          res.render('stats', {
            stats: stats
          });
        });
      });
    });



  });

  //On GET /graphs
  app.get('/graphs', function(req, res){
    //Create an empty object that we will store the statistics in.
    var stats = {};

    Hero.find({}, function(err,heroes){
      Map.find({}, function(err, maps){
        Game.find({}, function(err, games){

          stats.heroPlaytime = formulae.heroPlaytime(games);
          stats.gameModePlaytime = formulae.gameModePlaytime(games, maps);
          stats.heroTypePlaytime = formulae.heroTypePlaytime(games, heroes);

          //Render input.ejs and send the maps and heroes array.
          res.render('graphs', {
            stats: stats
          });
        });
      });
    });

  });

  //On GET /admin
  app.get('/admin', function(req, res){
    //Render admin.ejs to the DOM.
    res.render('admin');
  });

  //On POST /admin get the type of post.
  app.post('/admin/:type', function(req, res){
    //If the type is map.
    if(req.params.type == "map"){

      //Create a new map object with parameters of mapName and mapType from the page.
      var map = new Map({
        name: req.body.mapName,
        mapType: req.body.mapType
      });

      //Save the map object to the database.
      map.save(function(err) {
          if (err){
            //If an error occurred then throw it.
            throw err;
          } else {
            //Otherwise log a message in the console saying that the map was added to the database.
            console.log("Map successfully added: " + req.body.mapName + " Type: " + req.body.mapType);
            //Then redirect the browser to /admin.
            res.redirect('/admin');
          }
      });

      //Otherwise if the type is hero.
    } else if (req.params.type == "hero"){

      //Create a new hero object with parameters of heroName and heroType from the page.
      var hero = new Hero({
        name: req.body.heroName,
        type: req.body.heroType
      });

      //Save the hero obejct to the database.
      hero.save(function(err) {
            if (err){
              //If an error occurred then throw it.
              throw err;
            } else {
              //Otherwise log a message in the console saying that the hero was added to the database.
              console.log("Map successfully added: " + req.body.heroName + " Type: " + req.body.heroType);
              //Then redirect the browser to /admin.
              res.redirect('/admin');
            }
        });
      }

  });

  //On POST /input
  app.post('/input', function(req, res){
    //Create a new game object with parameters of a generated uuid; and map, winLose and heroes from the page.
    var game = new Game({
      uuid: uuid(),
      mapName: req.body.map,
      winLose: req.body.winLose,
      heroes: req.body.heroes
    });

    //Save the game object to the database.
    game.save(function(err) {
          if (err){
            //If an error occurred then throw it.
            throw err;
          } else {
            //Otherwise redirect the user to /input.
            res.redirect('/input');
          }
      });
  });
}
