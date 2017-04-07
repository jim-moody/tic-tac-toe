TOKEN="BAhJIiVkOTE2NzYwODc2MWY2OWEwOGZmZjk3MWFiOGI1MjI4NwY6BkVG--b1bd1e53d52f4247fdf0191b8c8105c30f30e103"
curl --include --request GET http://localhost:4741/games \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json"
