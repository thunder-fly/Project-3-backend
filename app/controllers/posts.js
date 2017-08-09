'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Blog = models.blog

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next, id) => {
  Blog.find()
    .then(blogs => res.json({
      blogs: blogs.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res, next) => {
  const findBlogId = req._parsedUrl.pathname.split('/')
  const blogId = findBlogId[2]
  console.log('this is req.params.id ', req.params.id)
  return Blog.find({_id: blogId})
  .then(blogs => {
    console.log('this is blogs ', blogs)
    console.log('this is blogs[0].posts[0] ', blogs[0].posts[0])
    return blogs.find({id: req.params.id})
  })
  // .then(blogs => {
  //   console.log('this is blogs that is being put into map ', blogs)
  //   return blogs
  // })
  .then(blogs => res.json({
    post: [blogs].find((e) =>
      e.toJSON({ virtuals: true, user: req.user }))
  }))
  .catch(next)
}
const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.blog.update(req.body.blog)
  .then(() => res.sendStatus(204))
  .catch(next)
}

const create = (req, res, next) => {
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
  { method: setUser, only: ['index', 'create'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Blog), except: ['show'] },
  { method: setModel(Blog, { forUser: true }), only: ['create', 'update', 'destroy'] }
] })
