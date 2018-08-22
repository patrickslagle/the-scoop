const Test = require('../database/mongoose');

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

}