const express = require('express')
const passport = require('passport')

const Restaurant = require('../models/restaurant')
const Comment = require('../models/comment')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/restaurants', (req, res, next) => {
  Restaurant.find()
    .populate('owner')
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'owner',
        model: 'User'
      }
    })
    .then(restaurants => {
      console.log(restaurants)
      return restaurants.map(restaurant => restaurant.toObject())
    })
    .then(restaurants => {
      res.json({ restaurants })
    })
    .catch(next)
})

router.get('/restaurants/:id', (req, res, next) => {
  const id = req.params.id
  // keep track of doc
  let restaurant
  Restaurant.findById(id)
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'owner',
        model: 'User'
      }
    })
    .then(handle404)
    .then(foundRestaurant => {
      // store doc
      restaurant = foundRestaurant.toObject()
      // find all comments of doc w/ specific id
      console.log(restaurant)
      return Comment.find({ restaurant: id })
    })
    .then(comments => {
      // // add comments to doc object for serializing
      // console.log(comments)
      // restaurant.comments = comments
      res.json({ restaurant })
    })
    .catch(next)
})
// CREATE ////  /restaurants
router.post('/restaurants', requireToken, (req, res, next) => {
  req.body.restaurant.owner = req.user.id
  console.log(req.body.restaurant)
  Restaurant.create(req.body.restaurant)
    .then(restaurant => {
      res.status(201).json({ restaurant: restaurant.toObject() })
    })
    .catch(next)
})
// UPDATE //// PATCH /restaurants/id
router.patch('/restaurants/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.restaurant.owner
  Restaurant.findById(req.params.id)
    .then(handle404)
    .then(restaurant => {
      requireOwnership(req, restaurant)
      return restaurant.update(req.body.restaurant)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DESTROY //// DELETE /posts/id
router.delete('/restaurants/:id', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(handle404)
    .then(restaurant => {
      requireOwnership(req, restaurant)
      restaurant.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
