#!/usr/bin/bash 
cat functionconstruct.js > fserver.js 
echo \( >> fserver.js 
./fuck.js server.js >> fserver.js 
echo \) >> fserver.js 
echo \( >> fserver.js 
echo \) >> fserver.js 
echo -n $(tr -d '\n' < fserver.js) > fserver.js
