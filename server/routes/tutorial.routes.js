module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    let router = require("express").Router();


// creating routes for endpoints 
router.post('/',tutorials.create);

router.get('/',tutorials.findAll);

router.get('/published',tutorials.findAllPublished);

router.get('/:id',tutorials.findOne);

router.get('/:id',tutorials.update);

router.get('/:id',tutorials.delete);

router.get('/:id',tutorials.deleteAll);

app.use('/api/tutorials',router);


}