const express = require('express');
const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(allCelebrities => {
      console.log("Hello from celebrities");
      res.render('celebrities/', {allCelebrities})

    })
    .catch(error => console.log('error loading or fetching data from db', error))  
});

// iteration 4: route for new celebrity

router.get('/new', (req,res, next)=> {
  res.render('celebrities/new')
})

router.post('/', (req, res) =>{
  const {name, occupation, catchPhrase} = req.body
  Celebrity.create({name, occupation, catchPhrase})
    .then(newEntryDB => {
      console.log(newEntryDB)
      res.redirect('/celebrities')
    })
    .catch(error => console.log('error while saving to DB', error))
})

// iteration 5: delete

router.post('/:id/delete', (req, res) => {
  const {id} = req.params
  Celebrity.deleteOne({_id : id})
    .then(celebDeleted => {
  console.log(celebDeleted)
    res.redirect('/celebrities')
})
.catch(error => console.log('error while deleting celeb from DB', error))
}) 

// Iteration 3: route for details

router.get('/:id', (req,res, next)=> {
  const celebId = req.params.id;
  console.log(celebId);
  Celebrity.findById(celebId)
    .then(celebDetails => {
      res.render('celebrities/show', {details : celebDetails })
      console.log(celebDetails);
    })
    .catch(error => console.log('error while retrieving data from DB', error))
})

// Iteration 6: edit

/* router.get('/celebrities/:id/edit', (req, res, next) => {
res.render('celebrities/new')
.catch(error => console.log('error while retrieving celebrity', error))
})  */

router.get('/:id/edit', (req, res, next) => {
  const {id} = req.params;
  Celebrity.findById(id)
  .then(celebToEdit => {
    res.render('celebrities/edit', {celeb: celebToEdit});
  })
  .catch(error => next(error));
});

router.post('/:id/edit', (req, res) => {
  const {id} = req.params;
  const {name, occupation, catchPhrase} = req.body;

  Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase}, {new: true})
  .then(updatedCeleb =>res.redirect('/celebrities'))
  .catch(error => next(error));
});

module.exports = router; 
