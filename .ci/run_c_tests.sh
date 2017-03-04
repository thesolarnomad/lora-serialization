#!/usr/bin/env bash
set -eu

pushd test > /dev/null
make clean all
make test
lcov \
  --test-name "loraSerialization" \
  --output-file coverage.info \
  --capture \
  --directory . > /dev/null
lcov \
  --output-file coverage.info \
  --extract coverage.info "**/src/*" > /dev/null
lcov --list ./coverage.info
mkdir -p ../coverage/C
genhtml -o ../coverage/C/lcov-report coverage.info > /dev/null
popd > /dev/null
