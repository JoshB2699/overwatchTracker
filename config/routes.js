//Require our mongoose schemas
const Map = require('../models/map.js');
const Game = require('../models/game.js');
const Hero = require('../models/hero.js');

module.exports = function(app, mongoose, uuid){

  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/input', function(req, res){
    Map.find({}, function(err, maps){

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

       Hero.find({}, function(err,heroes){

         heroes.sort(function(a,b){
          if(a.name>b.name){
            return 1;
          } else {
            return -1;
          }
         });

        res.render('input', {
          maps: maps,
          heroes: heroes
        });
      });
    });
  });

  app.get('/stats', function(req, res){
    res.render('stats');
  });

  app.get('/graphs', function(req, res){
    res.render('graphs');
  });

  app.get('/admin', function(req, res){
    res.render('admin');
  });

  app.post('/admin/:type', function(req, res){
    if(req.params.type == "map"){

      var map = new Map({
        name: req.body.mapName,
        mapType: req.body.mapType
      });

      map.save(function(err) {
          if (err){
            throw err;
          } else {
            console.log("Map successfully added: " + req.body.mapName + " Type: " + req.body.mapType);
            res.redirect('/admin');
          }
      });

    } else if (req.params.type == "hero"){

      var hero = new Hero({
        name: req.body.heroName,
        type: req.body.heroType
      });

      hero.save(function(err) {
            if (err){
              throw err;
            } else {
              console.log("Map successfully added: " + req.body.heroName + " Type: " + req.body.heroType);
              res.redirect('/admin');
            }
        });
      }

  });


  app.post('/input', function(req, res){

    var game = new Game({
      uuid: uuid(),
      mapName: req.body.map,
      winLose: req.body.winLose,
      heroes: req.body.heroes
    });

    game.save(function(err) {
          if (err){
            throw err;
          } else {
            res.redirect('/input');
          }
      });
  });
}
