# ee-publish

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/ee-bump.svg)](https://greenkeeper.io/)

helper for fast semantic version using git, github & npm

## installation

    npm i ee-publish

## usage

    publish [patch|minor|major|release|changelog] [--npm] [--branch=branchName] [--no-changelog] "commit message"

- **-n**: if this flag is passed to the publish command npm publish will called as last command
- **--npm**: if this flag is passed to the publish command npm publish will called as last command
- **-b branchName**: pushes changes to the specific branch
- **--branch=branchName**: pushes changes to the specific branch
- **--no-changelog**: dont do the changelog thing when releasing, instead take the latest changelog from the CHANGELOG file for th egithub release


### create a changelog

Adds the changelog created from the git commit history to the CHANGELOG file. Does nothing else. the changelog does not include commits that only made change to the following files

- .gitignore
- .npm-debug-log
- .travis.yml
- package.json
- changelog
- contributors
- authors
- readme
- shrinkwrap.json
- readme.md

### publish a patch

    publish "commit message"
    publish patch "commit message"

this executes the following commands

    git commit -am "commit message"
    git pull
    git status
    git push origin master
    git tag -a va.b.X -m "commit message"
    git push origin va.b.X


### publish a minor version

    publish minor "commit message"

this executes the following commands

    git commit -am "commit message"
    git pull
    git status
    git push origin master
    git tag -a va.X.0 -m "commit message"
    git push origin va.X.0


### publish a major version

    publish major "commit message"

this executes the following commands

    git commit -am "commit message"
    git pull
    git status
    git push origin master
    git tag -a vX.0.0 -m "commit message"
    git push origin vX.0.0


### publish a release

- pulls the latest changes from origin
- reinstalls all node modules
- runs tests
- creates shrinkwrap file
- creates & saves changelog
- commits changes, pushes them to origin
- creates a patch tag, pushes it to origin
- removes shrinkwrap file
- commits changes, pushes them to origin
- creates release on github

    publish release "release message"

this executes the following commands

    git commit -am "commit message"
    git pull
    git status
    rm -r node_modules
    npm i
    npm test
    npm shrinkwrap
    (creates a markdwon changelog, adds it to the changelog file)
    git add ./shrinkwrap.json
    git commit shrinkwrap.json -m "added shrinkwrap.json"
    [git add ./CHANGELOG]
    git commit ./CHANGELOG -m "updated changelog"
    git push origin master
    git tag -a va.X.0 -m "commit message"
    git push origin va.X.0
    rm shrinkrwrap.json
    git rm shrinkrwrap.json
    git commit -am "removed shrinkwrap.json"
    git push origin master
    (creates release on github)


### create release and publish it on npm

    publish release --npm "release message"

this executes the following commands
    
    git commit -am "commit message"
    git pull
    git status
    rm -r node_modules
    npm i
    npm test
    npm shrinkwrap
    (creates a markdwon changelog, adds it to the changelog file)
    git add ./shrinkwrap.json
    git commit shrinkwrap.json -m "added shrinkwrap.json"
    [git add ./CHANGELOG]
    git commit ./CHANGELOG -m "updated changelog"
    git push origin master
    git tag -a va.X.0 -m "commit message"
    git push origin va.X.0
    rm shrinkrwrap.json
    git rm shrinkrwrap.json
    git commit -am "removed shrinkwrap.json"
    git push origin master
    (creates release on github)
    npm publish
