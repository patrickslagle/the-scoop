const Test = require('../database/mongoose');
const Bathrooms = require('../database/Bathrooms');


module.exports = function(app){

  app.get('/test', (req, res) => {
    Test.find({}, (err, items) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(items); 
    })
  })

  app.post('/test', (req, res) => {
      console.log('in routers, req.body,', req.body)
      const test = req.body.test;

      Test.findOneAndUpdate({test}, 
        {test: req.body.test}, 
        {upsert: true, new: true}, 
        (err, item) => {
          if (err) return res.status(500).send(err)
          res.status(200).send(item); 
      })
  })

  app.get('/loadBathrooms', (req, res) => {
    Bathrooms.find({}, (err, bathrooms) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(bathrooms); 
    })
  })

  app.post('/addBathroom', (req, res) => {
    const bathroom = req.body.newBathroom; 
    console.log('adding a bathroom, req.body,', bathroom)
    Bathrooms.create(bathroom, function(err, data){
      if (err) return err; 
      res.status(200).send(data)
    })

})

}