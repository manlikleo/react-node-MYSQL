
// database variables 
const db = require ('../models')
Tutorials = db.tutorials,
Op = db.Sequelize.Op; 



// create tutorials 
exports.create =(req,res)=> {

    let createTut = req.body; 


    // check if title input from client has a valid input 
    if(!createTut.title){
        res.status(400).send({
            message: " Title can't be empty"
        });
        return
    }

    
    // create tutorial object 
    const tutorial = {
        title: createTut.title,
        description: createTut.description,
        published: createTut.published ? createTut.published : false,
    }; 

    // save tutorial object to database
    Tutorials.create(tutorial)
    .then(data => {
        res.send(data);
    })

    .catch(err=> {
        res.status(500).send({
            message: err.message || "error occured while saving data" 
        });
    });

};


// find all tutorials 
exports.findAll =(req,res)=> {
    const title = req.query.body; 

    // conditional to query the Tutorial database
    let condition = title ? {title: {[Op.like]: `%${title}%`}} : null; 

    Tutorials.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message|| "some error occured while finding tutorial."
        })
    })

}


//find one tutorial
exports.findOne =(req,res)=> {
    const id = req.params.id;

    // get query 
    Tutorials.findByPK(id)
    .then(data => {
        res.send(data);
    })

    .catch(err => {
        res.status(500).send({
            message: err.message|| "Error retriving tutorial" + id
        });
    });
    
}

// find tutorial 
exports.update =(req,res)=> {

    // updated tutorial object
    let updatedTut = req.body; 
    const id = req.query.id

    Tutorials.update(updatedTut,{
        where: {id:id}
    })
    .then (num => {
        if(num == 1 ){
            res.send({
                message: "Tutorial Updated",
            });
        }else{
            res.send({
                message : "Cannot find Tutorial"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message|| "Error retriving tutorial" + id
        });
    });
    

}



exports.delete =(req,res)=> {
    const id = req.query.id;

    Tutorials.update.destroy({
        where: {id:id}
    })
    .then (num => {
        if(num == 1 ){
            res.send({
                message: "Tutorial Deleted",
            });
        }else{
            res.send({
                message : "Unable to delete item"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message|| "Error retriving tutorial" + id
        });
    });

}

exports.deleteAll =(req,res)=> {
    Tutorials.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        let numlength = nums.length
        res.send({
            message: `${numlength} deleted`
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message|| "Error occured while deleting data" 
        });
    });


}

exports.findAllPublished =(req,res)=> {
    Tutorials.findAll ({where: {published:true}})
    .then (data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message|| "Error occured while retriving data" 
        });
    });

};