const express = require("express");

const Data = require("./helpers/actionModel.js");

const router = express.Router();


  
router.get('/', (req, res) => {
   Data.get().then(data => {
       res.status(200).json(data)
   }).catch(err => {
       console.log(err)
       res.status(500).json({errorMessage: "Could not retrieve list of actions"})
   })
});
  

router.get('/:id', (req, res) => {
    const { id } = req.params
    Data.get(id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not retrieve list of actions"})
    })
})

router.post('/',validateActionId,validateActionBody, (req, res) => {
    const newAction = req.body

    Data.insert(newAction).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not post actions"})
    })
});
  
router.put('/:id',validateActionId, (req, res) => {
    const changes = req.body
    const { id } = req.params;

    Data.update(id, changes).then(change => {
        res.status(200).json(change)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not change actions"})
    })
    
});
  
router.delete('/:id',validateActionId, (req, res) => {
    const { id } = req.params;

    Data.remove(id).then(removed => {
        res.status(200).json(removed)
    }).catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not Delete action"})
    })
});
  

function validateActionId(req, res, next) {
    const { id } = req.params
      Data.get(id).then(found => {
        if(found){
          next()
        } else {
          res.status(400).json({ message: "invalid project id for actions" })
        }
      })
  }

  function validateActionBody(req, res, next) {
    const valActionNotes = req.body.notes
    const valProjectDesc = req.body.description

  if(valActionNotes && valProjectDesc){
    next()
  } else if(!valActionNotes) {
    res.status(400).json({message: "missing action notes"})
  } else {
    res.status(400).json({ message: "missing action description"})
  }
  }






module.exports = router;