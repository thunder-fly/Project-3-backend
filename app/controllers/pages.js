const controller = require('lib/wiring/controller')
const models = require('app/models')
const Page = models.page

const setUser = require('./concerns/set-current-user')
const authenticate = require('./concerns/authenticate')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  console.log('req.query is ', req.query)
  // Page.find({ _owner: req.query.user_id })
  Page.find(req.query)
  // .then(pages => {
  //   pages.forEach(function (userPages) {
  //     console.log('this is pages[0].owner ', pages._owner)
  //     if (pages._owner === req.params.id) {
  //       return userPages
  //     }
  //   })
  // })
    .then(pages => res.json({ pages }))
    .catch(err => next(err))
}

const show = (req, res, next) => {
  Page.findById(req.params.id)
  .then(page => {
    console.log('this is page ', page)
    return page
  })
  .then(page => res.json({
    page: page.toJSON({ virtuals: true, user: req.user })
  }))
  .catch(next)
}

const create = (req, res, next) => {
  const page = Object.assign(req.body.page, {
    _owner: req.user._id
  })
  console.log('this is Page ', Page)
  Page.create(page)
  .then(page =>
    res.status(201)
      .json({
        page: page.toJSON({ virtuals: true, user: req.user })
      }))
  .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.page.update(req.body.page)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.page.remove()
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
  { method: setUser, only: ['show', 'index'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Page), only: ['show'] },
  { method: setModel(Page, { forUser: true }), only: ['update', 'destroy'] }
] })
