#!/bin/bash

set -e -u

echo
echo ">>>>> npm install"
echo

npm install

echo
echo ">>>>> bower install"
echo

bower install

echo
echo ">>>>> mocha tests"
echo

mocha
