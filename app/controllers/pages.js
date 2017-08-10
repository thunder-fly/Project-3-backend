const controller = require('lib/wiring/controller')
const models = require('app/models')
const Page = models.page

const setUser = require('./concerns/set-current-user')
const authenticate = require('./concerns/authenticate')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  const owner = { _owner: req.user._id }
  Page.find(owner)
    .then(pages => res.json({ pages }))
    .catch(err => next(err))
}

const show = (req, res, next) => {
  res.json({
    blog: req.blog.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const page = Object.assign(req.body.page, {
    _owner: req.user._id
  })
  Page.create(page)
    .then(page => res.json({ page }))
    .catch(err => next(err))
}

const update = (req, res, next) => {
  const search = { _id: req.params.id, _owner: req.user._id }
  Page.findOne(search)
    .then(page => {
      if (!page) {
        return next()
      }

      delete req.body._owner  // disallow owner reassignment.
      return page.update(req.body.page)
        .then(() => res.sendStatus(200))
    })
    .catch(err => next(err))
}

const destroy = (req, res, next) => {
  const search = { _id: req.params.id, _owner: req.user._id }
  Page.findOne(search)
    .then(page => {
      if (!page) {
        return next()
      }

      return page.remove()
        .then(() => res.sendStatus(200))
    })
    .catch(err => next(err))
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
  { method: setModel(Page), only: ['show'] },
  { method: setModel(Page, { forUser: true }), only: ['update', 'destroy', 'create'] }
] })
