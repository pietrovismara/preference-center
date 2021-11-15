#!/bin/sh
set -euo pipefail 
yarn install
yarn typeorm migration:run
yarn start:dev
