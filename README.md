# nodefuck
nodejs http server but written in the worst way possible: JSFuck
## Files
### fuck.js
Takes a file as input and outputs entire contents as an obfuscated string. From https://github.com/aemkei/jsfuck
### jsfuck.js
Library that fuck.js depends on. Outlines all conversions to JSFuck. From https://github.com/aemkei/jsfuck
### functionconstruct.js
Evaluates to the function constructor object ``Function`` for an input to be passed as argument and called to run said argument. Performed by accessing the ``flat`` property of an array, and done in JSFuck by taking advantage of the fact that Javascript allows array index notation to access properties of objects.
### nodefuck.js
Simple node server file written entirely in JSFuck. Output of ``build.sh`` or ``npm run build``
### package.json
npm package file, defines useful scripts for translating the server and testing implementations.
### server.js
Unobfuscated server code. Note the dynamic import, since neither import nor require work from inside a function scope, which is what JSFuck execution depends on
### strserver.js
Example of what nodefuck.js evaluates to.
### build.sh
Build script in Bash.
## JSFuck
JSFuck is an obfuscated form of Javascript inspired by BrainFuck that uses only six characters ``[]()+!`` and is valid Javascript code. More details at jsfuck.com and https://github.com/aemkei/jsfuck
## Running
Preferrably on a *NIX machine or using git bash or any version of WSL (Windows Subsystem for Linux) \
With the repository as the working directory and node and npm installed, run ``npm run build`` \
Then run ``npm start`` \
server.js will be compiled to JSFuck \
