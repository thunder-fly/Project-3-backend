'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// users of the app have special requirements

.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.post('/blogs/:id/posts', 'posts#create')
.patch('/blogs/:id/posts', 'posts#update')
.delete('/blogs/:id/posts', 'posts#delete')
.get('/blogs/:id/posts', 'posts#index')
.get('/blogs/:id/posts/:id', 'posts#show')
.resources('users', { only: ['index', 'show'] })
.resources('pages', { except: ['new', 'edit'] })
.resources('blogs', { except: ['new', 'edit'] })
// .resources('posts', { except: ['new', 'edit'] })

// all routes created
