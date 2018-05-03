const Map = require('../models/map.js');
const Game = require('../models/game.js');

module.exports = function(app, mongoose){

  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/input', function(req, res){
    Map.find({}, function(err, maps){

//      maps.sort(function(a,b) {return (a.mapType > b.mapType) ? 1 : ((b.mapType > a.mapType) ? -1 : 0);} )

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

      res.render('input', {
        maps: maps
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

  app.post('/admin', function(req, res){
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

  });

}
