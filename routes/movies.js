const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie.model');

router.get('/', (req, res) =>{
  Movie.find().populate('cast').then(movies => {
    res.render('movies/index', {movies});
    })
    .catch(err=>{
      next(err);
    });
});

router.get('/new', (req, res) => {
  Celebrity.find().then(celebrities => {
    res.render('movies/new', {celebrities});
  })
  .catch(err => {
    next(err);
  });
});

router.post('/', (req, res) => {
  const {title, genre, plot, cast} = req.body;
  console.log(cast);
  Movie.create({title, genre, plot, cast: cast}).then(()=>{
  res.redirect('/movies')  
  })
  .catch(err=>{
    next(err);
});
});

//Route: EDIT
router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).populate('cast')
    .then(movie => {
      console.log(movie);
      Celebrity.find().then(celebrities => {
        // console.log(movie.cast);
        let options = '';
        let selected = '';
        celebrities.forEach(actor => {
          selected = movie.cast.map(el => el._id).includes(actor._id) ? ' selected' : '';
          options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
        });
        console.log(options);
        // res.render('movies/edit', { movie, celebrities });
        res.render('movies/edit', { movie, options });
      })
    })
    .catch(err => {
      next(err);
    })
}); 

router.post('/:id/', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    });
});

//Route: DELETE

router.post('/:id/delete', (req, res) => {
  const {id} = req.params
  Movie.deleteOne({_id : id})
    .then(movieDeleted => {
  console.log(movieDeleted)
    res.redirect('/movies')
})
.catch(error => console.log('error while deleting celeb from DB', error))
})

module.exports = router;