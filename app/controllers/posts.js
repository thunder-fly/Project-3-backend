'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Blog = models.blog

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next, id) => {
  Blog.find(id)
    .then(posts => res.json({
      posts: posts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    blog: req.blog.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next, id) => {
  id = Blog._id
  // const post = Object.assign(req.body.post, {
  //   _owner: req.user._id
  // })
  Blog.find(id)
    .then(blog => blog.posts.push(req.body.post)
      .then((blog) => blog.save())
      .then(() => res.sendStatus(204))
        .json({
          post: blog.toJSON({ virtuals: true, blog: req.blog })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.blog.update(req.body.blog)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.blog.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Blog), only: ['show'] },
  { method: setModel(Blog, { forUser: true }), only: ['update', 'destroy'] }
] })
