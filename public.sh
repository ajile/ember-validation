#!/bin/bash
BASE_URL="ember-validation" LOCATION_TYPE="hash" ember build --environment=production --output-path=gh-pages
ember ember-cli-jsdoc
mv docs gh-pages/
cd gh-pages
git init
git remote add docs git@github.com:ajile/ember-validation.git
git fetch docs
git checkout --orphan gh-pages
git add .
git commit -am "Site"
git push -f docs gh-pages
git branch -u docs/gh-pages
cd ..
rm -rf gh-pages
