#!/bin/sh

rm -rf node_modules yarn.lock package-lock.json

yarn

cd android

./gradlew clean

cd ..

