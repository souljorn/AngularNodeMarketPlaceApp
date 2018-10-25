# CEN Group Project

## Setup

1)install angular cli
`npm install -g @angular/cli`
3)Check to make sure npm is not in production mode. This prevents dev dependincies being installed in your node modules. 
`npm config get production` 
4)Set the config to development mode
`npm config set -g production false`
2)install all npm dependencies
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



