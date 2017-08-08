'use strict'

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
// }, {
//   timestamps: true,
//   toJSON: {
//     virtuals: true,
//     transform: function (doc, ret, options) {
//       const blogId = (options.blog && options.blog._id) || false
//       ret.editable = blogId && blogId.equals(doc._owner)
//       return ret
//     }
//   }
}
)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  posts: [postSchema],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

// blogSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Blog = mongoose.model('Blog', blogSchema)
// const Post = mongoose.model('Post', postSchema)

module.exports = Blog
  // Post
