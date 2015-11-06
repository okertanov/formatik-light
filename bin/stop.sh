#!/bin/bash

set -e -u

forever stop formatik-light || true

forever list
