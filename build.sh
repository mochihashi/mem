#!/bin/bash
cd $(dirname $0)
projectDir=`pwd`
export PATH=$PATH:$HOME/.nodebrew/current/bin
`npm bin`/webpack --config $projectDir/src/jsx/webpack.config.js --mode production
