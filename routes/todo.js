const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/todolist/lists',(req,res,next) => {
  queries.getAll().then(lists => {
    res.status(200).json(lists);
  })
})

router.get('/todolist/list', (req,res,next) => {
  let id = req.query.id;
  let type = req.query.type;

  if(id){
    queries.getById(id).then(list => {
      res.status(200).json(list);
    })
  } else if (type){
    queries.getByType(type).then(lists => {
      res.status(200).json(lists);
    })
  }
})

router.post('/todolist', (req,res,next) => {
  let addList = req.body;
  queries.addList(addList).then(list => {
    res.status(200).json(list[0]);
  })
})

router.put('/todolist/:id', (req,res,next) => {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  let id = req.params.id;
  queries.editList(id,req.body).then(list => {
    res.status(200).json(list[0]);
  })
})

router.delete('/todolist/:id', (req,res,next) => {
  let id = req.params.id;
  queries.deleteList(id).then(deleted => {
    res.status(200).json(deleted[0]);
  })
})

module.exports = router;
