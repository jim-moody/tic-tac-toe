TOKEN="BAhJIiU0ODYzODQ2MDdlOWM4YTExMDk5MDNiNzkyNzdkYzU0MgY6BkVG--b7efdae2dfa113887146b3554a675d80586a0794"
curl --include --request DELETE http://localhost:4741/games/8 \
  --header "Authorization: Token token=$TOKEN" \
