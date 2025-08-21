#!/usr/bin/bash 
cat functionconstruct.js > nodefuck.js 
echo \( >> nodefuck.js 
./fuck.js server.js >> nodefuck.js 
echo \) >> nodefuck.js 
echo \( >> nodefuck.js 
echo \) >> nodefuck.js 
echo -n $(tr -d '\n' < nodefuck.js) > nodefuck.js
