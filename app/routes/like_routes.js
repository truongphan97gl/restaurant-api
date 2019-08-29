const express = require('express')
const passport = require('passport')

const Like = require('../models/like')
const Restaurant = require('../models/restaurant')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/likes', (req, res, next) => {
  Like.find()
    .populate('owner')
    .then(likes => {
      return likes.map(likes => likes.toObject())
    })
    .then(likes => {
      res.json({ likes })
    })
    .catch(next)
})

// CREATE ////  /restaurants
router.post('/likes', requireToken, (req, res, next) => {
  // set owner of new comment to be current user
  req.body.like.owner = req.user.id
  console.log(req.body)
  let likes = req.body.like

  Like.create(req.body.like)
  // respond to succesful `create` with status 201 and JSON of new "comment"
    .then(like => {
      let id = like._id
      let restaurantID = likes.restaurant

      Restaurant.findById(restaurantID)
        .populate('owner')
        .then(handle404)
        .then(foundRestaurant => {
          foundRestaurant.likes.push(id)
          let restaurant = foundRestaurant
          return foundRestaurant.update(restaurant)
        })
        .then(() => {
          res.status(200).json({ like: like.toObject() })
        })

        .catch(next)
    })

    .catch(next)
})
// // UPDATE //// PATCH /restaurants/id
// router.patch('/likes/:id', requireToken, removeBlanks, (req, res, next) => {
//   delete req.body.restaurant.owner
//   Like.findById(req.params.id)
//     .then(handle404)
//     .then(restaurant => {
//       requireOwnership(req, restaurant)
//       return restaurant.update(req.body.restaurant)
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
// DESTROY //// DELETE /posts/id
router.delete('/likes/:id', requireToken, (req, res, next) => {
  Like.findById(req.params.id)
    .then(handle404)
    .then(like => {
      requireOwnership(req, like)
      like.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
