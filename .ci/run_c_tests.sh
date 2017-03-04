#!/usr/bin/env bash
set -eu

pushd test > /dev/null
make clean all
make test
lcov \
  --test-name "loraSerialization" \
  --output-file ../coverage/C.info \
  --capture \
  --directory . > /dev/null
lcov \
  --output-file ../coverage/C.info \
  --extract ../coverage/C.info "**/src/*" > /dev/null
lcov --list ../coverage/C.info
mkdir -p ../coverage/C
genhtml -o ../coverage/C/lcov-report ../coverage/C.info > /dev/null
popd > /dev/null
