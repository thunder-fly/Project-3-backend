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

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.blog.update(req.body.blog)
  .then(() => res.sendStatus(204))
  .catch(next)
}
const create = (req, res, next) => {
  // const findBlogId = req._parsedUrl.pathname.split('/')
  // const blogId = findBlogId[2]
  const post = Object.assign(req.body.posts, {
    _owner: req.params.id
  })
  const blogToUpdate = req.params.id

  return Blog.findOneAndUpdate(blogToUpdate)
    // .then(data => console.log('this is data ', data))
    .then(blog => {
      blog.posts.push(post)
      return blog
    })
    .then((blog) => blog.save())
    .then((blog) => res.status(204)
      .json({
        blog: blog.toJSON({ virtuals: true, blog: req.blog.posts })
      }))
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
  { method: setUser, only: ['index', 'show', 'create'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Blog), except: ['show'] },
  { method: setModel(Blog, { forUser: true }), only: ['create', 'update', 'destroy'] }
] })
