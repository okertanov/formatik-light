#!/bin/bash

set -e -u

touch ./var/logs/forever.log || true
touch ./var/logs/stdout.log  || true
touch ./var/logs/stderr.log  || true

forever stop formatik-light || true

forever \
    start -m 5 --minUptime 10000 --spinSleepTime 1000 \
    --watch --append -p ./var -l logs/forever.log -o ./var/logs/stdout.log -e ./var/logs/stderr.log \
    --uid "formatik-light" --watchDirectory ./server --workingDir . server/App.js

forever list
