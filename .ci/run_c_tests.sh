#!/usr/bin/env bash
set -eu

pushd test > /dev/null
make test
popd > /dev/null