const express = require("express");

const Data = require("./helpers/projectModel.js");

const router = express.Router();


  
router.get('/', (req, res) => {
   Data.get().then(data => {
       res.status(200).json(data)
   }).catch(err => {
       console.log(err)
       res.status(500).json({errorMessage: "Could not retrieve list of projects"})
   })
});
  

router.get('/:id',validateProjectId,  (req, res) => {
    const { id } = req.params
    Data.get(id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not retrieve list of projects"})
    })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Data.getProjectActions(id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not retrieve list of project actions"})
    })
})

router.post('/',validateProjectId,validateProjectBody, (req, res) => {
    const newProject = req.body

    Data.insert(newProject).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not post project"})
    })
});
  
router.put('/:id',validateProjectId, (req, res) => {
    const changes = req.body
    const { id } = req.params;

    Data.update(id, changes).then(change => {
        res.status(200).json(change)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not change project"})
    })
    
});
  
router.delete('/:id',validateProjectId, (req, res) => {
    const { id } = req.params;

    Data.remove(id).then(removed => {
        res.status(200).json(removed)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not Delete project"})
    })
});
  

function validateProjectId(req, res, next) {
    const { id }= req.params;
      Data.get(id).then(found => {
        if(found){
          next()
        } else {
          res.status(400).json({ message: "invalid project id" })
        }
      })
  }

  function validateProjectBody(req, res, next) {
    const valProjectName = req.body.name
    const valProjectDesc = req.body.description

  if(valProjectName && valProjectDesc){
    next()
  } else if(!valProjectName) {
    res.status(400).json({message: "missing project name"})
  } else {
    res.status(400).json({ message: "missing project description"})
  }
  }






module.exports = router;