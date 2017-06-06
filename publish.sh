#!/bin/bash

version=($(jq -r '.version' package.json))
echo "Old version => " $version
minorVersion=`echo $version | cut -f3 -d.`
minorVersion=`expr $minorVersion + 1`
newVersion=`echo $version | cut -f1 -d.`.`echo $version | cut -f2 -d.`.$minorVersion
echo "New version => " $newVersion
sed -i "s/${version}/${newVersion}/g" package.json
npm run build
npm publish
npm run clean

./gitmerge.sh master 'Initial version'