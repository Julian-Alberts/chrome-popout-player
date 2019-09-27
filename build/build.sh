#!/bin/sh

BASEDIR=$(dirname "$0")

if [ -d "$BASEDIR/tmp" ]
then
    rm -rf "$BASEDIR/tmp"
fi
mkdir "$BASEDIR/tmp"

cd "$BASEDIR/../"
tsc --outDir "$BASEDIR/tmp"

cd -
if [ -f "$BASEDIR/tmp/util.spec.js" ]
then
    rm "$BASEDIR/tmp/util.spec.js"
fi

cd "$BASEDIR/../"

if [ -d "bin" ]
then
    rm -rf "bin"
fi
mkdir "bin"

cp popout-icon.svg bin/popout-icon.svg
cp popout-icon.png bin/popout-icon.png
cp manifest.json bin/manifest.json
cp -r build/tmp/* bin/

rm -rf build/tmp/
