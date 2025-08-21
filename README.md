# nodefuck
Node.js HTTP server but written in the worst way possible: JSFuck
## Files
### fuck.js and jsfuck.js
``fuck.js`` takes a file as input and outputs entire contents as valid but obfuscated Javascript code. Outputs to ``nodefuck.js`` by default \
``jsfuck.js`` is the library that ``fuck.js`` depends on; outlining all conversions to JSFuck. \
Original by [Martin Kleppe et al.](https://github.com/aemkei/jsfuck)
### nodefuck.js
Simple Node.js server file written entirely in JSFuck. Default output of ``npm run build``.
### server.js
Plain simple server code. Note the dynamic import, since neither ``import`` nor ``require()`` work from inside a function scope, which is what JSFuck execution depends on.
### strserver.js
Example of what ``nodefuck.js`` evaluates to. Essentially ``server.js`` wrapped in a function call.
### package.json
npm package file defining useful scripts for translating the server and testing implementations.
## JSFuck
JSFuck is an obfuscated form of Javascript inspired by BrainFuck that uses only six characters ``[]()+!`` and is valid Javascript code. More details at <jsfuck.com> and its [source](https://github.com/aemkei/jsfuck)
## Usage
Make sure the dependecies are installed: Node and npm \
With the repository as the working directory and node and npm installed, run ``npm run build`` where server.js will be compiled to JSFuck and outputted to nodefuck.js by default \
Then run ``npm start`` to start the server written entirely in JSFuck.
