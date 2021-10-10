#!/bin/sh

rm -rf node_modules ios/Pods ios/Podfile.lock yarn.lock package-lock.json ios/build

yarn

cd ios 
pod install
cd ..