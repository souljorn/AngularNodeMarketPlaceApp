# CEN Group Project

## Setup

1)install angular cli
`npm install -g @angular/cli`

2)Check to make sure npm is not in production mode. This prevents dev dependincies being installed in your node modules. 
`npm config get production` 

3)Set the config to development mode
`npm config set -g production false`

4)install all npm dependencies
`npm install`

## To Run Project

1)Must rebuild the angular project any time changes are made to angular code
`ng build`

2)Run the node js server
`node server.js`

Note: If you want to make the build process easier, download webstorm from jet brains and set up the run configurations for node and angular. 
Talk to Tim if you need help setting it up

## Creating a new component

Run `ng generate component component-name` to generate a new component.

## Updating branch with master before pushing commits

Make sure you are merging master into your branch so we don't have merge conflict.
What this does is makes sure your branch is up to date with master and that your code can be added into master when we do a pull request.

1)With your branch checkeed out get all the updated branches
`git fetch --all`

2)Stage all your files for commit
`git add .`
`git commit -m "Your Message"`

3)Merge master into your current branch
`git merge origin/master`

4)Resolve any merge conflicts if they exist(made really with webstorm)

5)Push your commits

