#!/bin/bash

echo "Now I'm add and commit changes ..."
echo
git add .
git commit -m "$2"
git push origin $1

git branch -v
