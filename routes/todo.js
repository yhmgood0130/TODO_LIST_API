const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/lists',(req,res,next) => {
  queries.getAll().then(lists => {
    res.status(200).json(lists);
  })
})

// router.get('/list/:id', (req,res,next) => {
//   let id = req.params.id;
//   queries.getById(id).then(list => {
//     res.status(200).json(list);
//   })
// })

router.get('/lists/list', (req,res,next) => {
  let items = req.query.type;
  console.log(items);
  queries.getByType(items).then(lists => {
    res.status(200).json(lists);
  })
})

router.post('/list', (req,res,next) => {
  let addList = req.body;
  queries.addList(addList).then(list => {
    res.status(200).json(list[0]);
  })
})

router.put('/list/:id', (req,res,next) => {
  let id = req.params.id;
  queries.editList(id,req.body).then(list => {
    res.status(200).json(list[0]);
  })
})

router.delete('/list/:id', (req,res,next) => {
  let id = req.params.id;
  queries.deleteList(id).then(deleted => {
    message: 'List deleted!';
  })
})

module.exports = router;
