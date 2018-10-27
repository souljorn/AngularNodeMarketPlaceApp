# CEN Group Project

## GettingStarted

### Setup

1)install angular cli
`npm install -g @angular/cli`

2)Check to make sure npm is not in production mode. This prevents dev dependincies being installed in your node modules. 
`npm config get production` 

3)Set the config to development mode
`npm config set -g production false`

4)install all npm dependencies
`npm install`

### To Run Project

1)Must rebuild the angular project any time changes are made to angular code
`ng build`

2)Run the node js server
`node server.js`

Note: If you want to make the build process easier, download webstorm from jet brains and set up the run configurations for node and angular. 
Talk to Tim if you need help setting it up

### Creating a new component

Run `ng generate component component-name` to generate a new component.

## GitHub Commands

### Creating a new branch and setting its upstream

This creates a new branch and sets the up stream for that branch. Do not change $(git_current_branch) it takes the name of your current branch.

1)`git checkout -b branch-name-story-number`

2)`git push --set-upstream origin $(git_current_branch)`

### Updating branch with master before pushing commits

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

if you had conflicts and resolved them you must append the commit by using

`git commit`

5)Push your commits

This command reads the current branch you are on and pushes it to the remote branch. Do not change $(git_current_branch) 

`git push origin $(git_current_branch)`

or if your upstream branch is set

`git push`

6) After pushing go to your branch on gitHub and create a pull request. Message Tim on Slack and I will look it over and merge it into master. 

### If you started work when on master branch and need to move all your work to a new branch

1)Store your changes

`git stash`

2)Create a new branch

`git checkout -b branch-name-story-number`

`git push --set-upstream origin $(git_current_branch)`

3)Move your changes to the new branch

`git stash pop`

## Tools to make your job easier

### Z-shell(OSX only)

Z-shell lets you see what branch you are on in the command line all the time and has a bunch of aliases for git hub commands which take some of the pain out of git.

https://ohmyz.sh/

How to install on OSX
`sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

### Webstorm IDE

This makes working with the mean stack so much easier. It also helps with git when you have merge conflicts

Webstorm: https://www.jetbrains.com/webstorm/

Student License: https://www.jetbrains.com/student/

