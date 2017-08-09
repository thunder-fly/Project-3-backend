Sserpdrow

Sserpdrow is a single page application that acts as a content management system. Users can use Sserpdrow to create a blog, blog posts, and web pages. Visitors to Sserpdrow can view all blog posts and pages publicy.


A link to the deployed back-end app.

A link to the repo for your front-end.
https://github.com/thunder-fly/Project-3-frontend


## API

A catalog of routes (paths and methods) that the API expects.

Use this as the basis for your own API documentation. Add a new third-level
heading for your custom entities, and follow the pattern provided for the
built-in user authentication documentation.

Scripts are included in [`scripts`](scripts) to test built-in actions. Add your
own scripts to test your custom API.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET http://localhost:4741/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:4741/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

### Blogs

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/blogs`               | `blogs#index`     |
| GET    | `/blogs/1`             | `blogs#show`      |
| POST   | `/blogs/`              | `blogs#create`    |
| PATCH  | `/blogs/1`             | `blogs#update`    |
| DELETE | `/blogs/1`             | `blogs#destroy`   |

#### GET /blogs

Request:

```sh
curl --include --request GET https://fathomless-atoll-64318.herokuapp.com/blogs \
  --header "Authorization: Token token=$TOKEN"

```

```sh
scripts/blogs/index-blog.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "blogs":
  [
    {
      "_id": "5988a8718060021f4ac9f67c",
      "updatedAt": "2017-08-07T17:54:08.256Z",
      "createdAt": "2017-08-07T17:50:41.923Z",
      "text": "updated blog",
      "_owner": "5988a81f8060021f4ac9f67b",
      "__v": 0,
      "posts": [],
      "id": "5988a8718060021f4ac9f67c",
      "editable": false
    },
    {
      "_id": "5988ca7391684e28ba6f0b17",
      "updatedAt": "2017-08-07T20:15:47.876Z",
      "createdAt": "2017-08-07T20:15:47.876Z",
      "title": "PLEASE",
      "_owner": "5988a81f8060021f4ac9f67b",
      "post": [],
      "__v": 0,
      "posts": [],
      "id": "5988ca7391684e28ba6f0b17",
      "editable": false
    }
  ]
}
```
#### GET /blogs/1

Request:

```sh
curl --include --request GET https://fathomless-atoll-64318.herokuapp.com/blogs/$ID \
  --header "Authorization: Token token=$TOKEN"

```

```sh
scripts/blogs/show-blog.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "blog":
  {
    "_id": "5988a8718060021f4ac9f67c",
    "updatedAt": "2017-08-07T17:54:08.256Z",
    "createdAt": "2017-08-07T17:50:41.923Z",
    "text": "updated blog",
    "_owner": "5988a81f8060021f4ac9f67b",
    "__v": 0,
    "posts": [],
    "id": "5988a8718060021f4ac9f67c",
    "editable": false
  }
}
```
#### GET /blogs/1

Request:

```sh
curl --include --request GET https://fathomless-atoll-64318.herokuapp.com/blogs/$ID \
  --header "Authorization: Token token=$TOKEN"

```

```sh
scripts/blogs/show-blog.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "blog":
  {
    "_id": "1",
    "updatedAt": "2017-08-07T17:54:08.256Z",
    "createdAt": "2017-08-07T17:50:41.923Z",
    "text": "updated blog",
    "_owner": "5988a81f8060021f4ac9f67b",
    "__v": 0,
    "posts": [],
    "id": "1",
    "editable": false
  }
}
```

#### POST /blogs

Request:

```sh
curl --include --request POST https://fathomless-atoll-64318.herokuapp.com/blogs/ \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "blog": {
      "title": "'"${TITLE}"'"
    }
  }'
```

```sh
scripts/blogs/create-blog.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "blog":
  {
    "_id": "5988a8718060021f4ac9f67c",
    "updatedAt": "2017-08-07T17:50:41.923Z",
    "createdAt": "2017-08-07T17:50:41.923Z",
    "text": "updated blog",
    "_owner": "5988a81f8060021f4ac9f67b",
    "__v": 0,
    "posts": [],
    "id": "5988a8718060021f4ac9f67c",
    "editable": true
  }
}
```

#### PATCH /blogs/1

Request:

```sh
curl --include --request POST https://fathomless-atoll-64318.herokuapp.com/blogs/$ID \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "blog": {
      "title": "'"${TITLE}"'"
    }
  }'
```

```sh
scripts/blogs/update-blog.sh
```

Response:

```md
HTTP/1.1 204 No Content


```
#### DELETE /blogs/1

Request:

```sh
curl --include --request POST https://fathomless-atoll-64318.herokuapp.com/blogs/$ID \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"
```

```sh
scripts/blogs/destroy-blog.sh
```

Response:

```md
HTTP/1.1 204 No Content

```

### Posts (Blog Posts)

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/blogs/:id/posts`     | `posts#index`     |
| GET    | `/blogs/:id/posts/:id` | `posts#show`      |
| POST   | `/blogs/:id/posts`     | `posts#create`    |
| PATCH  | `/blogs/:id/posts/:id` | `posts#update`    |
| DELETE | `/blogs/:id/posts/:id` | `posts#destroy`   |

#### GET /blogs/:id/posts
#### GET /blogs/:id/posts/:id
#### POST /blogs/:id/posts
#### PATCH /blogs/:id/posts/:id
#### DELETE /blogs/:id/posts/:id

### Pages

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/pages`               | `pages#index`     |
| GET    | `/pages/1`             | `pages#show`      |
| POST   | `/pages`               | `pages#create`    |
| PATCH  | `/pages/1`             | `pages#update`    |
| DELETE | `/pages/1`             | `pages#destroy`   |

#### GET /pages

Request:

```sh
curl --include --request GET https://fathomless-atoll-64318.herokuapp.com/pages \
  --header "Authorization: Token token=$TOKEN"

```

```sh
scripts/pages/index-page.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

asdhfjkalsdhflakjsdhflakjs
```
#### GET /pages/1
#### POST /pages
#### PATCH /pages/1
#### DELETE /pages/1


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
