#!/usr/bin/env bash

# check if `elm` exists on the path
elm &> /dev/null
STATUS=$?
if [[ $STATUS -ne 0 ]] ; then
  echo "Fatal error: \`elm\` was not found on the path. Maybe you need to install the Elm compiler?"
  echo
  echo "    https://guide.elm-lang.org/install/elm.html"
  echo
  exit $STATUS
fi

# stop script on first error
set -e

# compile webpage
echo "Making webapp..."
elm make --output ./comp/taste.js ./src/Main.elm

# compile node.js
echo "Making node.js version..."
elm make --output ./comp/taste-compiled.node.js ./src/NodeOp.elm
