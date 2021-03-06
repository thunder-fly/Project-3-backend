#!/bin/bash

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${ID}/posts" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "posts": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'"
    }
  }'

echo
