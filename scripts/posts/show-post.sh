
API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${ID}/posts/${POST_ID}" \
--include \
--request GET \
--header "Authorization: Token token=$TOKEN"

echo
