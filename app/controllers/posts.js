'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Blog = models.blog

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
// const setModel = require('./concerns/set-mongoose-model')

// const index = (req, res, next, id) => {
//   Blog.find()
//     .then(blogs => res.json({
//       blogs: blogs.map((e) =>
//         e.toJSON({ virtuals: true, user: req.user }))
//     }))
//     .catch(next)
// }

const show = (req, res, next) => {
  const findBlogId = req._parsedUrl.pathname.split('/')
  const blogId = findBlogId[2]
  console.log('this is req.params.id ', req.params.id)
  return Blog.find({_id: blogId})
  .then(blog => {
    console.log('this is blogs ', blog)
    console.log('this is blog[0].posts ', blog[0].posts)
    blog[0].posts.forEach(function (post) {
      if (post.id === req.params.id) {
        console.log('this is post ', post)
        res.json({
          post: post.toJSON({ virtuals: true, blog: req.blog })
        })
      }
    })
  })
  // .then(blogs => {
  //   console.log('this is blogs that is being put into map ', blogs)
  //   return blogs
  // })
  .catch(next)
}

const update = (req, res, next) => {
//   delete req.body._owner  // disallow owner reassignment.
//   req.blog.update(req.body.blog)
//   .then(() => res.sendStatus(204))
//   .catch(next)
  const findBlogId = req._parsedUrl.pathname.split('/')
  const blogId = findBlogId[2]
  console.log('this is req.body ', req.body)
  return Blog.update(
    { _id: blogId, 'posts._id': req.params.id },
    { $set: { 'posts.$.title': req.body.post.title } }
    // { $set: { 'posts.$.body': req.body.post.body } }
  )
    .then(() => res.status(204))
    .catch(next)
}

const create = (req, res, next) => {
  const post = Object.assign(req.body.posts, {
    _owner: req.params.id
  })
  const blogToUpdate = req.params.id

  Blog.findOneAndUpdate(blogToUpdate)
    // .then(data => console.log('this is data ', data))
    .then(blog => {
      blog.posts.push(post)
      return blog
    })
    .then((blog) => blog.save())
    .then((blog) => res.status(204)
      .json({
        blog: blog.toJSON({ virtuals: true, blog: req.body.posts })
      }))
    .catch(next)
}

const destroy = (req, res, next) => {
  // let postDefined
  // console.log('this is postDefined at the top', postDefined)
  const findBlogId = req._parsedUrl.pathname.split('/')
  const blogId = findBlogId[2]
  // Blog.findOneAndUpdate(req.blog.id === blogId)
  // .then(blog => console.log('this is blog ', blog))
  // return Blog.find({_id: blogId})
  // .then(blog => {
  //   return blog[0].posts.find((post) => post.id === req.params.id)
    // console.log('this is postDefined after assignment', postDefined)
      // }
      // return currentPost
  // })
  Blog.update({_id: blogId}, {$pull: {posts: {_id: req.params.id}}})
    // console.log('this is currentPost ', currentPost)
  // .then((post) => console.log('this is currentPost', post))
  // .then(post => post.remove())
  .then(() => res.sendStatus(204))
  .catch(next)
}
//           .then(() => res.sendStatus(204))
//           .catch(next)
// }
//   Blog.findOneAndUpdate(blogId)
//   .then(blog => {
//     console.log('this is blog ', blog)
//     blog[0].posts.forEach(function (post) {
//       if (post.id === req.params.id) {
//         console.log('this is post ', post)
//         post.remove()
//       }
//     })
//   })
//     .then((blog) => blog.save())
//     .then((blog) => res.status(204)
//       .json({
//         blog: blog.toJSON({ virtuals: true, blog: req.blog.posts })
//       }))
//     .catch(next)
// }

module.exports = controller({
  // index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, except: ['show'] },
  { method: authenticate, except: ['show'] }
  // { method: setModel(Blog), only: ['show'] },
  // { method: setModel(Blog, { forBlog: true }), only: ['create'] }
] })
